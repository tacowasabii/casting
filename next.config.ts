import type { NextConfig } from "next";

// NAS(SMB) 드라이브의 fs 오작동 재시도 shim — 모든 Next 프로세스에 선주입 (AGENTS.md 참고)
import "./scripts/fs-nas-shim.cjs";

const nextConfig: NextConfig = {
  // 기본 .next 경로는 NAS(SMB)에서 dev/types 하위가 delete-pending 유령으로 고착됨
  // (mkdir→EEXIST, write→ENOENT). 오염 안 된 새 경로로 이사. 되돌리지 말 것.
  // 단 Vercel 빌더는 산출물을 .next에서 찾으므로 배포 환경에서는 기본값을 쓴다.
  ...(process.env.VERCEL ? {} : { distDir: ".next-dist" }),
};

export default nextConfig;
