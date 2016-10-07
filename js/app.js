import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import index from './components/index/index';
import indexRoute from './routes/indexRoute';

ReactDOM.render(
  <Relay.RootContainer
    Component={index}
    route={new indexRoute()}
  />,
  document.getElementById('root')
);
