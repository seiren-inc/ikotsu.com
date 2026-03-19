import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Project-level rule overrides
  {
    rules: {
      // setState in useEffect は AnimatedScroll / Accordion で意図的に使用
      "react-hooks/set-state-in-effect": "off",
      // JSX 内の引用符エスケープ（テンプレートリテラル使用箇所で発生）
      "react/no-unescaped-entities": "off",
      // 未使用のインポート（開発中の変数は許容）
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]);

export default eslintConfig;
