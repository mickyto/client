import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { hashHistory, applyRouterMiddleware, Router, Route } from 'react-router';
import useRelay from 'react-router-relay';

import Query from './routes/Query';
import index from './components/index/index';
import Catalog from './components/catalog/catalog';
import Category from './components/category/category';
import Vendor from './components/vendor/vendor';


ReactDOM.render(
    <Router history={hashHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
        <Route path="/" component={index} queries={Query.index} />
        <Route path="/catalog" component={Catalog} queries={Query.catalog} />
        <Route path="/category/:id" component={Category} queries={Query.category} />
        <Route path="/vendor/:id" component={Vendor} queries={Query.vendor} />
    </Router>,
    document.getElementById('root')
);


