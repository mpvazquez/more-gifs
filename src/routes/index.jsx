import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import App from '../components/App/App';

export default (
  <Switch>
    <Route exact path="/" component={App} />
    <Redirect from="/*" to="/" />
  </Switch>
);
