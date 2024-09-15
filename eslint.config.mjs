import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {plugins: { import: importPlugin }},
  {rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "import/extensions": ["error"],
    "indent": ["error", 2], // Enforce 2 spaces for indentation
    "keyword-spacing": ["error", { "before": true, "after": true }], // Ensure spacing around keywords
    "space-infix-ops": ["error", { "int32Hint": false }], // Ensure spacing around infix operators
    "semi": ["error", "always"] // Enforce semicolons at the end of statements
  }},
];