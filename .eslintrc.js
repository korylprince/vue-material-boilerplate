module.exports = {
    parser: "babel-eslint",
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "google",
    ],
    parserOptions: {
        "sourceType": "module",
    },
    rules: {
        "arrow-body-style": ["error", "as-needed"],
        "arrow-parens": ["error", "as-needed"],
        "camelcase": "off",
        "indent": ["error", 4, {"SwitchCase": 1}],
        "linebreak-style": ["error", "unix"],
        "max-len": "off",
        "new-cap": "off",
        "no-console": ["error", {allow: ["error"]}],
        "object-curly-spacing": ["error", "never"],
        "promise/always-return": "off",
        "promise/no-return-wrap": ["error", {allowReject: true}],
        "quotes": ["error", "double"],
        "semi": ["error", "never"],
        "space-before-function-paren": ["error", "never"],
    },
    plugins: [
        "html",
        "promise",
        "vue",
    ],
}
