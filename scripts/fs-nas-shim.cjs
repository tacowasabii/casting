// D:\ 는 NAS(SMB) 매핑 드라이브라 fs 디렉터리 연산이 간헐적으로 실패한다:
//  - fs.promises.mkdir({recursive:true})가 부모가 있는데도 ENOENT (SMB 캐시/매핑 드라이브 이슈)
//  - 재귀 삭제 시 delete-pending 상태 때문에 ENOTEMPTY/EBUSY
// Next dev는 .next/dev/types 생성 실패를 치명 오류로 보고 프로세스를 종료하므로,
// 여기서 promises API를 감싸 재시도한다. next.config.ts에서 모든 프로세스에 주입됨.
"use strict";

// Vercel(리눅스) 빌드에서는 NAS 이슈가 없으므로 개입하지 않는다
if (!process.env.VERCEL && !global.__FS_NAS_SHIM__) {
  global.__FS_NAS_SHIM__ = true;

  const fs = require("fs");
  const path = require("path");
  const fsp = fs.promises;

  const RETRYABLE = new Set(["ENOENT", "ENOTEMPTY", "EBUSY", "EPERM", "UNKNOWN"]);
  const MAX_RETRY = 10;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const debug = (...args) => {
    if (process.env.FS_NAS_SHIM_DEBUG) console.error("[fs-nas-shim]", ...args);
  };

  debug("installed in pid", process.pid);

  const origMkdir = fsp.mkdir.bind(fsp);
  const origRm = fsp.rm.bind(fsp);
  const origRmdir = fsp.rmdir.bind(fsp);
  const origRename = fsp.rename.bind(fsp);

  // Node의 recursive mkdir가 매핑 드라이브에서 ENOENT를 뱉는 경우가 있어
  // 경로 컴포넌트를 하나씩 직접 만들고, 실패는 백오프 재시도한다.
  async function mkdirManual(target) {
    const parts = path.resolve(String(target)).split(path.sep).filter(Boolean);
    let cur = parts[0] + path.sep; // 'D:\'
    for (let i = 1; i < parts.length; i++) {
      cur = path.join(cur, parts[i]);
      for (let attempt = 0; ; attempt++) {
        try {
          await origMkdir(cur);
          break;
        } catch (err) {
          if (err.code === "EEXIST") break;
          if (RETRYABLE.has(err.code) && attempt < MAX_RETRY) {
            debug(`mkdir ${cur} → ${err.code}, retry #${attempt + 1}`);
            await sleep(100 * (attempt + 1));
            continue;
          }
          throw err;
        }
      }
    }
  }

  fsp.mkdir = async function mkdir(target, options) {
    try {
      return await origMkdir(target, options);
    } catch (err) {
      if (options && options.recursive && RETRYABLE.has(err.code)) {
        debug(`recursive mkdir ${target} → ${err.code}, manual fallback`);
        return mkdirManual(target);
      }
      throw err;
    }
  };

  // 삭제 계열: delete-pending이 풀릴 때까지 재시도, 끝내 안 지워지면 rename으로 치워둔다
  // (SMB에서 삭제는 막혀도 rename은 되는 경우가 많음)
  function withRemoveRetry(orig, label) {
    return async function (target, options) {
      for (let attempt = 0; ; attempt++) {
        try {
          return await orig(target, options);
        } catch (err) {
          if (
            (err.code === "ENOTEMPTY" || err.code === "EBUSY" || err.code === "EPERM") &&
            attempt < MAX_RETRY
          ) {
            debug(`${label} ${target} → ${err.code}, retry #${attempt + 1}`);
            await sleep(100 * (attempt + 1));
            continue;
          }
          if (err.code === "ENOTEMPTY" || err.code === "EBUSY" || err.code === "EPERM") {
            const aside = `${target}.stale-${process.pid}-${Date.now()}`;
            try {
              await origRename(target, aside);
              debug(`${label} ${target} → 삭제 불가, ${aside} 로 rename`);
              return;
            } catch {
              /* rename도 실패하면 원래 에러를 그대로 던진다 */
            }
          }
          throw err;
        }
      }
    };
  }

  // .next/dev/types 는 Next가 기동 시 재귀 삭제 후 재생성하는데, SMB에서는 열린 핸들
  // 때문에 delete-pending "유령 디렉터리"(mkdir→EEXIST, write→ENOENT, 목록에 없음)가
  // 되어 프로세스가 죽는다. 삭제를 통째로 건너뛴다 — 어차피 파일은 덮어써진다.
  const TYPES_DIR_RE = /[\\/]\.next[^\\/]*[\\/]dev[\\/]types([\\/]|$)/;

  fsp.rm = async function rm(target, options) {
    if (typeof target === "string" && TYPES_DIR_RE.test(target)) {
      debug(`rm ${target} → skip (types dir 삭제 차단)`);
      return;
    }
    return withRemoveRetry(origRm, "rm")(target, options);
  };
  fsp.rmdir = async function rmdir(target, options) {
    if (typeof target === "string" && TYPES_DIR_RE.test(target)) {
      debug(`rmdir ${target} → skip (types dir 삭제 차단)`);
      return;
    }
    return withRemoveRetry(origRmdir, "rmdir")(target, options);
  };

  // 동기/콜백 API로 지우는 경로도 막는다
  const origRmSync = fs.rmSync.bind(fs);
  fs.rmSync = function rmSync(target, options) {
    if (typeof target === "string" && TYPES_DIR_RE.test(target)) {
      debug(`rmSync ${target} → skip`);
      return;
    }
    return origRmSync(target, options);
  };
  const origRmdirSync = fs.rmdirSync.bind(fs);
  fs.rmdirSync = function rmdirSync(target, options) {
    if (typeof target === "string" && TYPES_DIR_RE.test(target)) {
      debug(`rmdirSync ${target} → skip`);
      return;
    }
    return origRmdirSync(target, options);
  };

  // 쓰기 계열: 방금 만든 디렉터리가 SMB not-found 캐시(기본 5초) 때문에 안 보여
  // open이 ENOENT로 실패할 수 있다 → 부모를 보장하고 캐시가 풀릴 때까지 재시도.
  const origWriteFile = fsp.writeFile.bind(fsp);
  fsp.writeFile = async function writeFile(file, data, options) {
    for (let attempt = 0; ; attempt++) {
      try {
        return await origWriteFile(file, data, options);
      } catch (err) {
        if (err.code === "ENOENT" && typeof file === "string" && attempt < MAX_RETRY) {
          debug(`writeFile ${file} → ENOENT, retry #${attempt + 1}`);
          try {
            await mkdirManual(path.dirname(file));
          } catch {
            /* 부모 생성 실패는 다음 재시도에 맡긴다 */
          }
          await sleep(200 * (attempt + 1)); // 누적 ~11s > SMB 캐시 5s
          continue;
        }
        throw err;
      }
    }
  };
}
