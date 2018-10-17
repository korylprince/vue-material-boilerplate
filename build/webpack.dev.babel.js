import webpack from "webpack"
import merge from "webpack-merge"

import baseConfig from "./webpack.base.babel.js"

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
    devtool: "#cheap-module-inline-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
}

export default merge(baseConfig, devConfig)
