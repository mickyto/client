import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { hashHistory, applyRouterMiddleware, Router, Route } from 'react-router';
import useRelay from 'react-router-relay';

import Query from './routes/Query';
import index from './components/index/index';
import catalog from './components/catalog/catalog';


ReactDOM.render(
    <Router history={hashHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
        <Route path="/" component={index} queries={Query.index} />
        <Route path="/catalog" component={catalog} queries={Query.catalog} />
    </Router>,
    document.getElementById('root')
);


