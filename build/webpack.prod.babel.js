import path from "path"
import CleanWebpackPlugin from "clean-webpack-plugin"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
import merge from "webpack-merge"

const root = path.resolve(__dirname, "../")

import {baseConfig, postcssLoader} from "./webpack.base.babel.js"

const prodConfig = {
    mode: "production",
    optimization: {
        minimizer: [
            new CleanWebpackPlugin(["dist"], {root}),
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.(css|styl(us)?|s[ac]ss)$/g,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {importLoaders: 1, sourceMap: true}},
                    postcssLoader,
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {importLoaders: 2, sourceMap: true}},
                    postcssLoader,
                    {loader: "sass-loader", options: {sourceMap: true}},
                ],
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {importLoaders: 2, sourceMap: true}},
                    postcssLoader,
                    {loader: "stylus-loader", options: {sourceMap: true}},
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style/[name].css",
        }),
    ],
}

export default merge(baseConfig, prodConfig)
