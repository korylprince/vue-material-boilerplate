import webpack from "webpack"
import merge from "webpack-merge"

import baseConfig from "./webpack.base.babel.js"

var devConfig = {
    stats: {children: false},
    devServer: {
        stats: "minimal"
    },
    devtool: "#cheap-module-inline-source-map",
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: "development",
            DEBUG: true
        })
    ]
}

export default merge(baseConfig, devConfig)
