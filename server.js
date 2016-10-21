import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import compression from 'compression';

import webpackConfig from './webpack.config.babel';
import config from './config';

const app = express();

app.use(compression());

if (config.env === 'production') {
    app.use('/', express.static(path.resolve(__dirname, 'public')));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    });
    app.listen(config.port, function() {
        console.log(`Production Express server running at localhost:${config.port}`)
    });
}
else {

    const devServer = new WebpackDevServer(webpack(webpackConfig), {
        contentBase: '/public/',
        publicPath: '/js/',
        stats: {
            colors: true
        },
        hot: true,
        inline: true,
        historyApiFallback: true
    });
    devServer.use('/', express.static(path.resolve(__dirname, 'public')));
    devServer.listen(config.port, () => {
        console.log(`App is now running on http://localhost:${config.port}`);
    });
}
