import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // ─── Ignored Paths ─────────────────────────────────────────────
  {
    ignores: ["dist", "node_modules", "coverage"],
  },

  // ─── Base JS Rules ─────────────────────────────────────────────
  js.configs.recommended,

  // ─── TypeScript Rules ──────────────────────────────────────────
  ...tseslint.configs.recommended,

  // ─── React Rules ───────────────────────────────────────────────
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect", // auto detect react version
      },
    },
    rules: {
      // ─── React ───────────────────────────────────────────────
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // not needed in React 18
      "react/prop-types": "off", // we use TypeScript instead
      "react/display-name": "warn", // memo components should have displayName
      "react/self-closing-comp": "warn", // <Component /> not <Component></Component>
      "react/no-array-index-key": "warn", // avoid using index as key

      // ─── React Hooks ─────────────────────────────────────────
      ...reactHooks.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error", // hooks only in components/hooks
      "react-hooks/exhaustive-deps": "warn", // missing deps in useEffect/useMemo

      // ─── React Refresh ────────────────────────────────────────
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // ─── TypeScript ───────────────────────────────────────────
      "@typescript-eslint/no-explicit-any": "error", // no any types
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" }, // allow _unused params
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" }, // use import type {}
      ],
      "@typescript-eslint/no-non-null-assertion": "warn", // avoid ! operator
      "@typescript-eslint/explicit-function-return-type": "off", // too strict for React

      // ─── General ──────────────────────────────────────────────
      "no-console": ["warn", { allow: ["warn", "error"] }], // no console.log in prod
      "no-debugger": "error", // no debugger statements
      "prefer-const": "error", // always use const
      "no-var": "error", // never use var
      eqeqeq: ["error", "always"], // always use === not ==
      "no-duplicate-imports": "error", // no duplicate imports
    },
  },
);
