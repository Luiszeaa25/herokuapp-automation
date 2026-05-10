module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: ["src/test/features/**/*.feature"],
        import: [
            "src/test/steps/**/*.ts",
            "src/hooks/*.ts"
        ],
        loader: ["ts-node/esm"],
        format: [
            "progress-bar",
            "summary",
            "allure-cucumberjs/reporter"
        ],
        publishQuiet: true,
        dryRun: false,
        timeout: 30000
    }
}
