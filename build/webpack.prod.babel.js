import path from "path"
import CleanWebpackPlugin from "clean-webpack-plugin"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
import merge from "webpack-merge"

const root = path.resolve(__dirname, "../")

import baseConfig from "./webpack.base.babel.js"

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
}

export default merge(baseConfig, prodConfig)
