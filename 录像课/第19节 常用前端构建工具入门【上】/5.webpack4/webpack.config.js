const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
/**
 * bundle 分析(bundle analysis)
 * */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');
/**
 * vue
 * */
const VueLoaderPlugin = require('vue-loader/lib/plugin');
console.log('執行webpack.config.js --------------------------------------------- webpack.config.js執行')
module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/iii.js'),
    },
    output: {
        filename: `[name].bundle.js`,
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        // hot: true,
        contentBase: __dirname,
        stats: "minimal"
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: '/node_moduels/'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: +Math.random() + '管理输出管理输出管理输出管理输出',
            filename: 'iii.js.html',
            template: 'iii.js.html',
            inject: true
        }),
        new ManifestPlugin({
            fileName: 'manifest.json',
            publicPath: '给所有manifest资源的value加个前缀/',
            // writeToFileEmit: true,

        }),

        new webpack.ProvidePlugin({
            Vue: ['vue/dist/vue.esm.js', 'default'],
            $: 'jquery',
            jQuery: 'jquery',
            polyfill: 'polyfill',
            mui: 'mui',
            myLayer: path.resolve(__dirname,'static/js/common_resources/layer.min'),
            configuration: path.resolve(__dirname, 'static/js/common/configuration'),
            common: path.resolve(__dirname, 'static/js/common/common'),
        }),


        //  热更新
        new webpack.HotModuleReplacementPlugin(),
        /**
         * bundle 分析(bundle analysis)
         * */
        // new BundleAnalyzerPlugin(),
        // new Visualizer({
        //     filename: './statistics.html',
        // })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
};