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
import Login from '../components/gate/login';
import Signup from '../components/gate/signup';
import Profile from '../components/profile/profile';
import NewProduct from '../components/models/newProduct';
import NewSpecifications from '../components/models/newSpecifications';
import Images from '../components/models/images';


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
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/profile' component={Profile} />
        <Route path='/profile/models' component={NewProduct} queries={Viewer} prepareParams={prepareParams} />
        <Route path='/profile/models/:id/specifications' component={NewSpecifications} queries={Viewer} prepareParams={prepareParams} />
        <Route path='/profile/models/:id/images' component={Images} queries={Viewer} prepareParams={prepareParams} />
        <Route path='*' component={NoMatch}/>
    </Route>
);
