import React from 'react';
import { Route } from 'react-router';

import Query from './Query';
import index from '../components/index/index';
import catalog from '../components/catalog/catalog';


export default (
    <Route path="/" component={index} queries={Query.index}>
        <Route path="/catalog" component={catalog} queries={Query.catalog} />
    </Route>
);


