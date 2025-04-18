import path from "node:path";
import dotenv from "dotenv";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import { VueLoaderPlugin } from "vue-loader";
const getDotEnvFilePath = (env) => {
    switch (env) {
        case "local":
        case "dev":
            return ".env.local";
        case "qa":
            return ".env.qa";
        case "live":
            return ".env.production";
    }
    return ".env";
};

console.log("webpack");
const env = process.env.ENV;
console.log("env: ", env);
const __dirname = path.resolve();
const envFilePath = getDotEnvFilePath(env);
const config = dotenv.config({
    path: path.resolve(__dirname, envFilePath),
});

if (config.error) {
    throw new Error(config.error.message);
} else if (!config.parsed) {
    throw new Error(`config parsed empty. env file path: ${path.resolve(__dirname, envFilePath)}`);
}

const webpackConfig = {
    mode: config.parsed.BUILD_MODE,
    entry: "./src/index.ts",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)/,
                type: "asset/resource",
            },
            {
                test: /\.(js|ts)/,
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {
        extensions: [
            ".js",
            ".ts", 
            ".vue",
        ],
        alias: {
            "@": path.resolve(__dirname, "src")
        },
        plugins: [
            new TsconfigPathsPlugin()
        ],
    },
};
export default webpackConfig;