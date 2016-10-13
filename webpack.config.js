const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let appEntry;
let devtool;
let plugins;

if (process.env.NODE_ENV === 'production') {
    appEntry = [path.join(__dirname, 'js/app.js')];
    devtool = 'source-map';
    plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'skukit',
            template: './public/index.html',
            mobile: true,
            inject: false
        })
    ];
} else {
    appEntry = [
        path.join(__dirname, 'js/app.js'),
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server'
    ];
    devtool = 'eval';
    plugins = [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ];
}

module.exports = {
    entry: {
        app: appEntry,
        vendor: ['react', 'react-dom', 'react-relay', 'react-router', 'react-router-relay']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1' +
                    '&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
                ]
            }
        ],
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool,
    postcss: () => [precss, autoprefixer],
    plugins
};


