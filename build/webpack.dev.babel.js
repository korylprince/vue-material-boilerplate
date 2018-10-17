import merge from "webpack-merge"

import baseConfig from "./webpack.base.babel.js"

const devConfig = {
    mode: "development",
    stats: {children: false},
    devServer: {
        stats: "minimal",
        proxy: {
            "/api": process.env.API_SERVER,
        },
    },
    devtool: "#cheap-module-inline-source-map",
}

export default merge(baseConfig, devConfig)
