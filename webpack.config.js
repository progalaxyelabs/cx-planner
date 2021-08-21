const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production', // "production" | "development" | "none"
    entry: {
        files: [
            path.resolve(__dirname, './src/index.js'),
            path.resolve(__dirname, './src/styles.scss')
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                './src/index.html',
                './src/favicon.ico',
                './src/site.webmanifest',
                { from: 'img/**/*', context: path.resolve(__dirname, 'src') }
            ]
        })
    ],
    output: {
        filename: 'scripts.js',
        path: path.resolve(__dirname, './public'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {

                            }
                        }
                    }
                ]
            },
        ]
    },
    watch: false,
    watchOptions: {
        aggregateTimeout: 600,
        ignored: '**/node_modules'
    }
};