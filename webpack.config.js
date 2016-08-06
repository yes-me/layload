
var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: {
        './build/app': "./src/scripts/app.js",
        './build/app.min': './src/scripts/app.js'
    },
    output: {
        filename: '[name].js'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
	watch: true
}