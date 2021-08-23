const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production', // "production" | "development" | "none"
    entry: {
        files: [
            './src/index.js',
            './src/styles.scss'
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: '*.(html|ico|webmanifest)', context: path.resolve(__dirname, 'src') },
                { from: 'img/**/*', context: path.resolve(__dirname, 'src') }
            ]
        })
    ],
    output: {
        filename: 'scripts.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "postcss-loader",
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: false
                            }
                        }
                    }
                ]
            }
        ]
    },
    watch: false,
    watchOptions: {
        aggregateTimeout: 600,
        ignored: '**/node_modules'
    }
};