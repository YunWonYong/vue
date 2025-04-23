import webpack from "webpack";
import path from "node:path";
import dotenv from "dotenv";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import { VueLoaderPlugin } from "vue-loader";
import ESLintPlugin from "eslint-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const getDotEnvFilePath = (env) => {
    switch (env) {
        case "dev":
            return ".env.dev";
        case "qa":
            return ".env.qa";
        case "live":
            return ".env.live";
    }

    throw new Error(`env ${env} not found .env file path.`);
};

const getEnv = (env) => {
    if (!env) {
        return "dev";
    }
    switch (env) {
        case "local":
        case "dev":
            return "dev";
        case "qa":
        case "stage":
            return "qa";
        case "production":
        case "live":
            return "live";
    }

    throw new Error(`env ${env} not supported.`);
};

console.log("webpack");
const env = getEnv(process.env.ENV);
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

const isProduction = env === "live";

const webpackConfig = {
    mode: config.parsed.BUILD_MODE,
    entry: "./src/index.ts",
    output: {
        filename: isProduction? "main[contenthash].js": "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
            },
            {
                test: /\.(js|ts)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/,
                options: {
                    reactivityTransform: true,
                    enableTsInTemplate: true,
                },
            },
            {
                test: /\.ico$/,
                type: "asset/resource",
                generator: {
                    filename: "favicon.ico",
                },
            },
            {
                test: /\.css$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            "vue-style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        localIdentName: "[local]__[hash:base64:8]",
                                        namedExport: false,
                                    },
                                }
                            },
                        ],
                    },
                    {
                        use: [
                            "vue-style-loader",
                            "css-loader",
                        ],
                    }
                ],
            },
        ],
    },
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


const htmlWebpackPluginOptions = {
    template: "./index.html",
    favicon: path.resolve(__dirname, "public/favicon.ico")
};

const plugins = [
    new VueLoaderPlugin(),
];

if (!isProduction) {
    const host = config.parsed.HOST || "localhost";
    const port = config.parsed.PORT || 3000;

    webpackConfig.devServer = {
        host,
        port,
        hot: true,
        compress: true,
        open: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: /./,
                    to: "/index.html",
                }
            ],
        },
        client: {
            overlay: true,
        },
    };

    plugins.push(
        new ESLintPlugin({
            extensions: ["js", "ts", "vue"],
        })
    );

    webpackConfig.devtool = "eval-source-map";

    const proxyContext = config.parsed.PROXY_CONTEXT;
    const proxyTarget = config.parsed.PROXY_API_URL;
    if (proxyContext && proxyTarget) {
        webpackConfig.devServer.proxy = [
            {
                context: proxyContext,
                target: proxyTarget,
                changeOrigin: true,
                pathRewrite: {
                    [`^${proxyContext}`]: "",
                },
            }
        ];
    }
} else {
    webpackConfig.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ],
    };

    htmlWebpackPluginOptions.minify = {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        useShortDoctype: true,
    };
}

plugins.push(
    new HtmlWebpackPlugin(htmlWebpackPluginOptions),
    new webpack.DefinePlugin({
        BASE_SERVER_API_URL: JSON.stringify(config.parsed.BASE_SERVER_API_URL),
        ENV: JSON.stringify(env),
        __VUE_OPTIONS_API__: JSON.stringify(false),  // Vue Options API 활성화
        __VUE_PROD_DEVTOOLS__: JSON.stringify(!isProduction), // Vue devtools 비활성화 (production에서만)
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(!isProduction), // Hydration mismatch 세부 사항 비활성화
    }),
);
webpackConfig.plugins = plugins;
export default webpackConfig;