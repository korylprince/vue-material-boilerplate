import webpack from "webpack"
import OptimizeJsPlugin from "optimize-js-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
import merge from "webpack-merge"

import baseConfig from "./webpack.base.babel.js"

var prodConfig = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false
        }),
        new OptimizeJsPlugin({
            sourceMap: false
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.(css|styl)$/g
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: "production",
            DEBUG: false
        })

    ]
}

export default merge(baseConfig, prodConfig)
