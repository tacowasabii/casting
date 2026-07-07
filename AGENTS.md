<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 프로젝트 주의사항 (캐스트보드)

- **D:\ 는 NAS 매핑 드라이브** (\\ucloudnas...\HOMEDIR\86742). Turbopack은 realpath(UNC)를
  루트 밖으로 판정해 dev/build 모두 실패한다 → **반드시 `--webpack` 사용**
  (package.json 스크립트에 이미 반영됨). 이 플래그를 제거하지 말 것.
- 포트 3000은 다른 프로젝트(D:\CQI vite dev 서버)가 쓰는 경우가 많음 → dev는 `-p 3100` 권장.
- 데이터는 전부 목(mock): 화면은 `src/lib/data.ts`의 async 함수만 호출한다.
  `mock-data.ts` 직접 import 금지 — 이 경계가 이후 Supabase 교체 지점이다.
- 기획서는 `plan.md`, 기획 리뷰는 `claudedocs/plan-review.md` 참고.
