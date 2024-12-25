const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.transformer.minifierPath = require.resolve("metro-minify-esbuild");
config.transformer.minifierConfig = {
    drop_console: true,
    treeShaking: true,
    metafile: "meta.json",
    analyze: true,
};

module.exports = config;
