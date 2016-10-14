import React from 'react';
import { Route } from 'react-router';


import Category from '../components/category/category';
import Vendor from '../components/vendor/vendor';
import Product from '../components/product/product';
import index from '../components/index/index';
import Catalog from '../components/catalog/catalog';
import Viewer from './viewer';
import Queries from './queries';

export default (
    <Route>
        <Route path="/" component={index} queries={Viewer} />
        <Route path="/catalog" component={Catalog} queries={Viewer} />
        <Route path="/category/:id" component={Category} queries={Queries.category} />
        <Route path="/vendor/:id" component={Vendor} queries={Queries.vendor} />
        <Route path="/product/:id" component={Product} queries={Queries.product} />
    </Route>
);


