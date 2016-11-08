import React from 'react';
import { Route, IndexRoute } from 'react-router';
import cookie from 'react-cookie';


import Category from '../components/category/category';
import Vendor from '../components/vendor/vendor';
import Product from '../components/product/product';
import Index from '../components/index/index';
import Catalog from '../components/catalog/catalog';
import Layout from '../components/layout/layout';
import Queries from './queries';


function locale() {
        const currentLocale = cookie.load('locale');
        return { locale: currentLocale.alias };
}

export default (
    <Route path='/' component={Layout}>
        <IndexRoute component={Index} queries={Queries.viewer} prepareParams={locale} />
        <Route path='/catalog' component={Catalog} queries={Queries.viewer} />
        <Route path='/category/:id' component={Category} queries={Queries.category} />
        <Route path='/vendor/:id' component={Vendor} queries={Queries.vendor} />
        <Route path='/product/:id' component={Product} queries={Queries.product} />
    </Route>
);

// <Route path="*" component={NoMatch}/>
