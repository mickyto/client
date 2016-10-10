import React from 'react';
import { Route } from 'react-router';

import ViewerQuery from './ViewerQuery';
import index from '../components/index/index';


export default (
    <Route path="/" component={index} queries={ViewerQuery.index}/>
);