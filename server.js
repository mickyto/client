import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
import { schema } from './data/schema.js';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
const graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({
    schema,
    pretty: true,
    graphiql:true
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// Serve the Relay app
const app = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/public/',
    proxy: {
        '/graphql': `http://localhost:${GRAPHQL_PORT}`
    },
    publicPath: '/js/',
    stats: {
        colors: true
    },
    hot: true,
    inline: true
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});
