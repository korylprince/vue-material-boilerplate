import webpack from "webpack"
import merge from "webpack-merge"

import {baseConfig, postcssLoader} from "./webpack.base.babel.js"

const devConfig = {
    mode: "development",
    stats: {children: false},
    devServer: {
        hot: true,
        stats: "minimal",
        proxy: {
            "/api": process.env.API_SERVER,
        },
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader", options: {importLoaders: 1, sourceMap: true}},
                    postcssLoader,
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader", options: {importLoaders: 2, sourceMap: true}},
                    postcssLoader,
                    {loader: "sass-loader", options: {sourceMap: true}},
                ],
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader", options: {importLoaders: 2, sourceMap: true}},
                    postcssLoader,
                    {loader: "stylus-loader", options: {sourceMap: true}},
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
}

export default merge(baseConfig, devConfig)
