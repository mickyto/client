const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
    entry: {
        app: [
            path.join(__dirname, 'js/app.js'),
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server'
        ],
    },//path.resolve(__dirname, 'js', 'app.js'),
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
    output: {filename: 'app.js', path: '/'},
    postcss: () => [precss, autoprefixer],
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};


