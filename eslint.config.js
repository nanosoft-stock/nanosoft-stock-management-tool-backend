import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    languageOptions: {
      globals: globals.browser,
      // Add additional settings if needed
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Allow usage of any without warnings
      "@typescript-eslint/no-explicit-any": "off", // Disable the rule for any
    },
  },
];

