import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import tailwindcss from "eslint-plugin-tailwindcss";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

/**
 * 🌐 ESLint Config – Vantage Lane 2.0
 * Stack: Next.js 15 + TypeScript + Tailwind + Supabase
 * Focus: clean, scalable, production-ready architecture
 */

export default [
  js.configs.recommended,
  prettierConfig,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],

    ignores: [
      ".next/**",
      "node_modules/**", 
      "dist/**",
      "build/**",
      "coverage/**",
      "scripts/**",
      "public/**",
      "**/*.config.{js,ts,mjs}",
      "**/*.d.ts",
      "*.md",
      ".env*",
      "__tests__/**", 
      "**/*.test.*",
      "**/*.spec.*",
      "cascade.log",
      ".cascade/**",
    ],

    plugins: {
      "@typescript-eslint": tsPlugin,
      "unused-imports": unusedImports,
      "react-hooks": reactHooks,
      react,
      tailwindcss,
      prettier,
      "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
        jsxPragma: null,
        jsxPragmaFrag: null,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
        JSX: "readonly",
      },
    },

    settings: {
      react: { version: "detect" },
      tailwindcss: { callees: ["cn"] },
    },

    rules: {
      // 🧠 TypeScript strict
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_|theme|newTheme",
          ignoreRestSiblings: true,
        },
      ],

      // 🚫 Unused imports cleanup
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // ⚛️ React & Hooks
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // 🎨 Tailwind
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",

      // 🧩 Import sorting
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",

      // 💅 Prettier (for code style)
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
          singleQuote: true,
          semi: true,
          trailingComma: "all",
          printWidth: 100,
          tabWidth: 2,
        },
      ],

      // 🧹 Clean code rules
      "prefer-const": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-unused-vars": "off", // Use @typescript-eslint/no-unused-vars instead
      "max-lines": [
        "warn",
        { max: 250, skipBlankLines: true, skipComments: true },
      ],
      "max-lines-per-function": [
        "warn",
        { max: 120, skipBlankLines: true, skipComments: true },
      ],

      // 🚫 Relative import restriction
      "no-restricted-imports": [
        "error",
        { 
          patterns: [{
            group: ["../"], 
            message: "Use absolute imports (e.g. '@/components/...') instead of relative imports."
          }]
        },
      ],

    },
  },
];
