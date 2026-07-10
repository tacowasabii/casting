import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // NAS 이슈: 변경된 distDir(.next-dist2, 이름 증가 가능) + SMB delete-pending 잔해 (스캔 시 EPERM)
    ".next-dist*/**",
    ".next-ghost*/**",
    ".next-stale*/**",
    ".trash-*/**",
    // 앱 코드가 아닌 자산: 디자인 목업 지원 스크립트, CJS 노드 shim
    "design/**",
    "scripts/*.cjs",
  ]),
]);

export default eslintConfig;
