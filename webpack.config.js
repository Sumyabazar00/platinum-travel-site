
const path = require("path")
const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')]

module.exports = {
    entry: "./app/assets/scripts/App.js",
    output: {
        filename: "bundled.js",
        path: path.resolve(__dirname, "app")
    },
    devServer: {
        static: path.join(__dirname, 'app'),
        // hot: true,
        port: 4000,
        host: '0.0.0.0',
        setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            devServer.watchFiles(["./app/**/*.html"]);
            return middlewares;
        },
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: { plugins: postCSSPlugins },
                        },
                    },],
            },
        ],
    },
}