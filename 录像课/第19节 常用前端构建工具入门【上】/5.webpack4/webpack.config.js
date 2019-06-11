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

module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    // minChunks: 2
                }
            }
        }
    },
    entry: {
        app: './src/index.js',
        print: './src/print.js',
        // jquery: 'jquery',
        // vue: 'vue',
    },
    output: {
        filename: `[name].bundle.js`,
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            title: +Math.random() + '管理输出管理输出管理输出管理输出',
        }),

        new ManifestPlugin({
            fileName: 'manifest.json',
            publicPath: '给所有manifest资源的value加个前缀/',
            // writeToFileEmit: true,

        }),

        /**
         * bundle 分析(bundle analysis)
         * */
        // new BundleAnalyzerPlugin(),
        // new Visualizer({
        //     filename: './statistics.html',
        // })
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ],
            }
        ]
    }

};


() => {
    module.exports = {
        entry: './src/index.js',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                }, {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }, {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ],
                }, {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            // make sure to include the plugin!
            // new VueLoaderPlugin()
        ],
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
            }
        },
    };
}