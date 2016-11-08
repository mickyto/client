import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import useRelay from 'react-router-relay';

import routes from './routes/routes';
import config from '../config';

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(config.graphqlServer, {
        fetchTimeout: 30000,
        retryDelays: [5000]
    })
);

ReactDOM.render(
    <Router
        history={browserHistory}
        renderLoading={() => <div>Loading...</div> }
        routes={routes}
        render={applyRouterMiddleware(useRelay)}
        environment={Relay.Store}
    />,
    document.getElementById('root')
);
