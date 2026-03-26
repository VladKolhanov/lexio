import { fileURLToPath, URL } from "node:url"
import { includeIgnoreFile } from "@eslint/compat"
import eslint from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import { defineConfig } from "eslint/config"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import jsxA11y from "eslint-plugin-jsx-a11y"
import reactPlugin from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import tseslint from "typescript-eslint"
import vitest from "@vitest/eslint-plugin"

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url))

const restrictUnnecessaryImports = defineConfig([
  {
    ignores: [
      "**/env.ts",
      "**/env-client.ts",
      "src/infrastructure/i18n/**/*",
      "src/shared/components/ui/link",
    ],
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message:
            "Use `import { ENV } from '@/shared/env'` instead to ensure validated types.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message:
                "Please import from `@/infrastructure/i18n/navigation` instead.",
            },
            {
              name: "next/navigation",
              importNames: ["redirect", "useRouter", "usePathname"],
              message:
                "Please import from `@/infrastructure/i18n/navigation` instead.",
            },
            {
              name: "next/router",
              importNames: ["useRouter"],
              message:
                "Please import from `@/infrastructure/i18n/navigation` instead.",
            },
            {
              name: "next-intl",
              importNames: ["useLocale"],
              message:
                "Please import from `@/infrastructure/i18n/navigation` instead.",
            },
            {
              name: "@/infrastructure/i18n/navigation",
              importNames: ["Link"],
              message:
                "Please import from `@/shared/components/ui/link` instead.",
            },
          ],
        },
      ],
    },
  },
])

export default defineConfig([
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  reactHooks.configs["recommended-latest"],
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  jsxA11y.flatConfigs.recommended,
  eslintConfigPrettier,
  restrictUnnecessaryImports,

  { ignores: ["**/*.config.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "simple-import-sort": simpleImportSort,
      vitest,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...vitest.configs.recommended.rules,
      eqeqeq: "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-duplicate-imports": "error",
      "no-eval": "error",
      "no-template-curly-in-string": "error",
      "no-unreachable": "error",
      "no-useless-catch": "error",
      "no-var": "error",
      "prefer-template": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-indexed-object-style": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-unnecessary-template-expression": "error",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/prefer-literal-enum-member": "error",
      "@typescript-eslint/prefer-reduce-type-parameter": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/unified-signatures": "error",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        {
          allowConstantLoopConditions: true,
        },
      ],
      "react/boolean-prop-naming": [
        "error",
        { rule: "^(is|has|as)[A-Z]([A-Za-z0-9]?)+" },
      ],
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: ["arrow-function", "function-declaration"],
        },
      ],
      "react/hook-use-state": ["error", { allowDestructuredState: true }],
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-props-no-spread-multi": "error",
      "react/no-this-in-sfc": "error",
      "react/style-prop-object": "error",
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^\\u0000"],
            ["^react", "^node:", "^@?\\w"],
            ["^@/\\w"],
            ["^./", "^../", "^.+\\.s?css$"],
          ],
        },
      ],

      "simple-import-sort/exports": "warn",
    },
  },
])
