const path = require('path');

module.exports = {
    mode: 'development', // "production" | "development" | "none"
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 600,
        ignored: '**/node_modules'
    }
};