import react from "eslint-plugin-react";
import globals from "globals";
import love from "eslint-config-love";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { files: ["**/*.{js,ts,jsx,tsx}"] },
  {
    ignores: [
      "**/metro.config.js",
      "app.config.js",
      "babel.config.js",
      "android/**/*",
      "ios/**/*",
      ".expo/**/*",
      "eslint.config.mjs",
      "src/components/ui/**/*", // These are 3rd party components, don't lint for now
    ],
  },
  {
    plugins: {
      react,
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {},
  },
  love,
  eslintConfigPrettier,
  {
    rules: {
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/class-methods-use-this": [
        "warn",
        {
          ignoreClassesThatImplementAnInterface: true,
        },
      ],
      "@typescript-eslint/prefer-destructuring": "off",
    },
  },
];
