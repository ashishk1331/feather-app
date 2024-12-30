// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: "expo",
    ignorePatterns: ["/dist/*"],
    rules: {
        eqeqeq: "off",
        "no-unused-vars": "error",
        "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
        "no-console": "error",
    },
};
