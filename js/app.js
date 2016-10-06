import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import StarWarsApp from './components/StarWarsApp';
import StarWarsAppHomeRoute from './routes/StarWarsAppHomeRoute';

ReactDOM.render(
  <Relay.RootContainer
    Component={StarWarsApp}
    route={new StarWarsAppHomeRoute()}
  />,
  document.getElementById('root')
);
