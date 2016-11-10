import React from 'react';
import { Route, IndexRoute } from 'react-router';
import cookie from 'react-cookie';

import Category from '../components/category/category';
import Vendor from '../components/vendor/vendor';
import Product from '../components/product/product';
import Index from '../components/index/index';
import Catalog from '../components/catalog/catalog';
import Layout from '../components/layout/layout';
import Viewer from './viewer';
import NoMatch from '../components/noMatch/noMatch'


function prepareParams(params, { location }) {
    const currentLocale = cookie.load('locale');
    return {
        ...params,
        locale: currentLocale ? currentLocale.alias : ''
    }
}

export default (
    <Route path='/' component={Layout}>
        <IndexRoute component={Index} queries={Viewer} prepareParams={prepareParams} />
        <Route path='/catalog' component={Catalog} queries={Viewer} prepareParams={prepareParams} />
        <Route path='/category/:id' component={Category} queries={Viewer} prepareParams={prepareParams} />
        <Route path='/vendor/:id' component={Vendor} queries={Viewer} prepareParams={prepareParams} />
        <Route path='/product/:id' component={Product} queries={Viewer} prepareParams={prepareParams} />
        <Route path="*" component={NoMatch}/>
    </Route>
);
