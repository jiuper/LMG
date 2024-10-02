import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import standard from "eslint-plugin-standard";
import _import from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["src/configs", "./trash", "**/libs"],
}, ...fixupConfigRules(compat.extends(
    "prettier",
    "airbnb",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "next/core-web-vitals",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        react: fixupPluginRules(react),
        standard,
        import: fixupPluginRules(_import),
        "simple-import-sort": simpleImportSort,
        "unused-imports": unusedImports,
        prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "tsconfig.json",
            tsconfigRootDir: ".",
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "linebreak-style": "off",
        "unused-imports/no-unused-imports": "warn",

        "unused-imports/no-unused-vars": ["warn", {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
        }],

        "prettier/prettier": ["warn", {
            arrowParens: "always",
            bracketSpacing: true,
            endOfLine: "auto",
            jsxBracketSameLine: false,
            jsxSingleQuote: false,
            parser: "typescript",
            printWidth: 120,
            proseWrap: "preserve",
            semi: true,
            singleQuote: false,
            tabWidth: 4,
            trailingComma: "all",
            useTabs: false,
            bracketSameLine: false,
        }],

        "no-new": "off",
        "no-underscore-dangle": "off",
        "no-debugger": "error",
        "prefer-const": "error",
        camelcase: "off",
        "no-use-before-define": "off",

        "no-console": ["warn", {
            allow: ["error"],
        }],

        "no-unused-expressions": "warn",
        "no-void": "off",
        "no-nested-ternary": "off",
        "brace-style": "off",
        "prefer-promise-reject-errors": "off",
        "react/prop-types": "off",
        "react/display-name": "off",
        "react/static-property-placement": "off",
        "react/state-in-constructor": "off",

        "react/jsx-filename-extension": ["error", {
            extensions: [".tsx"],
        }],

        "react/jsx-one-expression-per-line": "off",
        "react/jsx-indent": "off",
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-props-no-spreading": "off",
        "react/jsx-curly-newline": "off",
        "react/destructuring-assignment": "off",
        "react/sort-comp": "off",
        "react/no-array-index-key": "off",
        "react/require-default-props": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-noninteractive-tabindex": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "jsx-a11y/iframe-has-title": "off",
        "jsx-a11y/control-has-associated-label": "off",

        "jsx-a11y/anchor-is-valid": ["error", {
            components: ["Link"],
            specialLink: ["hrefLeft", "hrefRight"],
            aspects: ["invalidHref", "preferButton"],
        }],

        "newline-before-return": "error",

        "spaced-comment": ["warn", "always", {
            markers: ["/"],
        }],

        "comma-dangle": ["error", "always-multiline"],
        "arrow-parens": ["error", "always"],
        "no-restricted-syntax": "off",
        "no-restricted-exports": "off",

        "space-before-function-paren": ["error", {
            anonymous: "never",
            named: "never",
            asyncArrow: "always",
        }],

        "react/function-component-definition": "off",
        indent: "off",

        "max-len": ["error", 120, 2, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: "*",
            next: "return",
        }, {
            blankLine: "always",
            prev: "*",
            next: "if",
        }],

        "implicit-arrow-linebreak": "off",
        "no-plusplus": "off",
        "max-classes-per-file": "off",
        "operator-linebreak": "off",
        "object-curly-newline": "off",
        "class-methods-use-this": "off",
        "no-confusing-arrow": "off",
        "function-paren-newline": "off",
        "no-param-reassign": "off",
        "no-shadow": "off",
        "consistent-return": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/no-shadow": "off",

        "@typescript-eslint/no-misused-promises": ["error", {
            checksVoidReturn: false,
        }],

        "@typescript-eslint/consistent-type-imports": "error",
        "import/no-relative-parent-imports": "off",
        "import/no-duplicates": "error",
        "import/no-cycle": "error",
        "import/no-unresolved": "off",
        "import/no-named-as-default-member": "off",
        "import/prefer-default-export": "off",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": ["off"],
        "import/no-anonymous-default-export": "off",
        "simple-import-sort/exports": "warn",

        "simple-import-sort/imports": ["warn", {
            groups: [[
                "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
            ], ["^react", "^@?\\w"], ["^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)"], ["^\\u0000"], ["^\\.\\.(?!/?$)", "^\\.\\./?$"], ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], ["^.+\\.s?css$"]],
        }],

        "react/jsx-wrap-multilines": "off",
        "no-spaced-func": "off",
    },
}];