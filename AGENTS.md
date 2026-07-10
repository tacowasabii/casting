<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 프로젝트 주의사항 (캐스트보드)

- **D:\ 는 NAS 매핑 드라이브** (\\ucloudnas...\HOMEDIR\86742). Turbopack은 realpath(UNC)를
  루트 밖으로 판정해 dev/build 모두 실패한다 → **반드시 `--webpack` 사용**
  (package.json 스크립트에 이미 반영됨). 이 플래그를 제거하지 말 것.
- 포트 3000은 다른 프로젝트(D:\CQI vite dev 서버)가 쓰는 경우가 많음 → dev는 `-p 3100`
  (package.json 스크립트에 반영됨).
- **NAS SMB 유령 디렉터리 대응 (제거 금지)**: 기본 `.next/dev/types` 경로가 SMB
  delete-pending으로 고착돼(mkdir→EEXIST, write→ENOENT, 목록에 없음) dev 서버가 즉사하는
  문제가 있어 `distDir` 이사 + `scripts/fs-nas-shim.cjs`(fs 재시도/삭제차단 shim,
  next.config.ts에서 주입)를 적용했다. `.next-dist`도 2026-07-09 같은 증상으로 고착돼
  현재 `distDir: ".next-dist2"`(next.config.ts). tsconfig include도 `.next-dist2/...`
  기준. 같은 증상이 재발하면 distDir을 또 다른 이름으로 바꾸면 된다. 고착된 옛
  디렉터리는 삭제가 안 되면 `.next-ghost-*`로 rename해 격리(.gitignore `/.next*/` 커버).
- 데이터는 전부 목(mock): 화면은 `src/lib/data.ts`의 async 함수만 호출한다.
  `mock-data.ts` 직접 import 금지 — 이 경계가 이후 Supabase 교체 지점이다.
- 기획서는 `plan.md`, 기획 리뷰는 `claudedocs/plan-review.md` 참고.
