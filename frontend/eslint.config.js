import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
  {
    // Generated design screens carry `@ts-nocheck`: they are written under the design
    // phase's plain-JavaScript contract, not as hand-written TypeScript. That contract
    // uses `const self = this` inside plain `function` callbacks (no arrow-function
    // lexical `this`) and reassignable `let` loop cursors; both are ordinary JavaScript,
    // just not the style these two TypeScript-oriented rules expect.
    files: ["src/screens/**"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-this-alias": "off",
      "prefer-const": "off",
    },
  },
);
