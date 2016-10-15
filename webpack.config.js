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
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new HtmlWebpackPlugin({
            title: 'skukit',
            filename: path.join(__dirname, 'public', 'index.html'),
            template: path.join(__dirname, 'public', 'src.html'),
            mobile: true,
            inject: false,
            links: [
                {
                    href: '/index.css',
                    rel: 'stylesheet'
                }
            ]
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
        }),
        new HtmlWebpackPlugin({
            title: 'skukit',
            filename: path.join(__dirname, 'public', 'index.html'),
            template: path.join(__dirname, 'public', 'src.html'),
            devServer: 'http://localhost:3000',
            inject: false,
            scripts: [
                '/js/app.js'
            ],
            excludeChunks: [
                'app',
                'vendor'
            ],
            links: [
                {
                    href: '/index.css',
                    rel: 'stylesheet'
                }
            ]
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
        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: '[name].js'
    },
    devtool,
    postcss: () => [precss, autoprefixer],
    plugins
};


