import path from "path"
import webpack from "webpack"
import VueLoaderPlugin from "vue-loader/lib/plugin"
import VuetifyLoader from "vuetify-loader/lib/plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
import autoprefixer from "autoprefixer"

const root = path.resolve(__dirname, "../")

const API_BASE = process.env.API_BASE ? process.env.API_BASE : "http://localhost/api/1.0"

const postcssLoader = {
    loader: "postcss-loader",
    options: {
        sourceMap: true,
        plugins: [
            autoprefixer(),
        ],
    },
}

const baseConfig = {
    entry: {
        app: path.resolve(root, "src/app.js"),
    },
    output: {
        path: path.resolve(root, "dist/"),
        filename: "js/[name].js",
    },
    stats: {
        children: false,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            "vue$": path.resolve(root, "node_modules", "vue/dist/vue.runtime.esm.js"),
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            API_BASE: JSON.stringify(API_BASE),
        }),
        new VueLoaderPlugin(),
        new VuetifyLoader(),
        new HtmlWebpackPlugin({
            template: path.resolve(root, "src/index.html"),
        }),
        new FaviconsWebpackPlugin({
            logo: path.resolve(root, "src/img/favicon.png"),
            prefix: "icons/",
        }),
    ],
}

export {baseConfig, postcssLoader}
