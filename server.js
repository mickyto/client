import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.config';
import { schema } from './data/schema.js';
import config from './config';

const app = express();

if (config.env === 'production') {
    app.use('/graphql', graphQLHTTP({ schema }));
    app.use('/', express.static(path.resolve(__dirname, 'public')));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    });
    app.listen(config.port, function() {
        console.log(`Production Express server running at localhost:${config.port}`)
    });
}
else {
    app.use('/', graphQLHTTP({
        schema,
        pretty: true,
        graphiql:true
    }));
    app.listen(config.graphql.port, () => console.log(
        `GraphQL Server is now running on http://localhost:${config.graphql.port}`
    ));

    const devServer = new WebpackDevServer(webpack(webpackConfig), {
        contentBase: '/public/',
        proxy: {
            '/graphql': `http://localhost:${config.graphql.port}`
        },
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










