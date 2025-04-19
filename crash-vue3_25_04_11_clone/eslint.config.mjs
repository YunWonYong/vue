import { defineConfig }  from "eslint/config";
import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import typescript from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";

export default defineConfig([
    {
        files: [
            "**/*.js"
        ],
        plugins: {
            js,
        },
        languageOptions: {
            parser,
            ecmaVersion: 2020,
            sourceType: "module",
        },
        rules: {
            ...js.configs.recommended.rules,
            indent: [
                "warn",
                4
            ],
        },
    },
    {
        files: [
            "**/*.ts"
        ],
        plugins: {
            "@typescript-eslint": typescript,
        },
        languageOptions: {
            parser,
            ecmaVersion: 2020,
            sourceType: "module",
        },
        rules: {
            ...typescript.configs.recommended.rules,
            indent: [
                "warn",
                4
            ],
        },
    },
    {
        files: [
            "**/*.vue"
        ],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser,
            },
            ecmaVersion: 2020,
            sourceType: "module",
        },
        plugins: {
            vue
        },
        rules: {
            ...(vue.configs["recommended"].rules || {}),
            indent: [
                "warn",
                4
            ],
            "vue/html-indent": ["error", 4, { baseIndent: 0 }],
            "vue/script-indent": ["error", 4, { baseIndent: 0 }],
        },
    }
]);