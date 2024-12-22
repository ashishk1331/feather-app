import { getDefaultConfig } from "expo/metro-config";

const config = getDefaultConfig(__dirname);

config.transformer.minifierPath = require.resolve("metro-minify-esbuild");
config.transformer.minifierConfig = {
    drop: ["console"],
};

export default config;
