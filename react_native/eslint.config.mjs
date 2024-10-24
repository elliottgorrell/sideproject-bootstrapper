import react from 'eslint-plugin-react'
import globals from 'globals'
import love from 'eslint-config-love'

export default [
    {
        ignores: ["**/metro.config.js", "**/.eslintrc.js", "android/**/*", "ios/**/*", ".expo/**/*"],
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
    {
        ...love,
    }
];
