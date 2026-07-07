# 캐스트보드 (UI 셸)

영화·드라마 캐스팅 디렉터용 지원자 관리 시스템(ATS)의 UI 셸.
백엔드 없이 목데이터만으로 전 화면을 클릭해볼 수 있다. 기획서: [plan.md](plan.md)

## 실행

```powershell
npm install
npm run dev   # webpack 모드 (NAS 드라이브에서 Turbopack 사용 불가 — AGENTS.md 참고)
```

포트 3000이 다른 프로젝트에 점유된 경우가 많으므로 `npx next dev --webpack -p 3100` 권장.

## 데모 동선

| 화면 | 경로 |
|------|------|
| 대시보드 (배역 칸반) | `/` |
| 선별 보드 — 형사2역, 지원 10건 | `/roles/role-101` |
| 숏리스트 목록 / 결과 (응답 3/5) | `/roles/role-101/shortlists` → `sl-1` |
| 오디션 안내 | `/roles/role-101/audition` |
| 배우 라이브러리 (28명) | `/actors` |
| 지원 폼 (모바일, 공개) | `/apply/role-102` |
| 감독 리뷰 (모바일, 토큰 링크) | `/review/demo-hs2` |

클릭스루: 대시보드 → 배역 카드 → 선별 보드에서 분류/체크 → 숏리스트 만들기 →
발급 링크(새 탭)로 감독 카드 뷰 → 좋아요/보류/제외 → 완료 요약 → 디렉터 결과 화면.

## 구조

- `src/lib/types.ts` — 기획서 5절 데이터 모델
- `src/lib/mock-data.ts` — 시드 (작품 2, 배역 6, 배우 28, 지원 33, 숏리스트 2)
- `src/lib/data.ts` — **유일한 데이터 접근 지점** (전부 async — Supabase 교체 경계)
- `src/app/(director)/` — 디렉터 화면 (사이드바 레이아웃)
- `src/app/(public)/` — 배우·감독용 공개 화면 (모바일 컬럼 레이아웃)

배우 사진은 이니셜 아바타로 렌더되며, `public/avatars/`에 파일을 두고
`Actor.photo`를 채우면 코드 수정 없이 실사진으로 교체된다.
