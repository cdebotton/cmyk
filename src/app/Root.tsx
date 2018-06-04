import React, { SFC } from 'react';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import { Switch, Route } from 'react-router';
import { injectGlobal, SimpleInterpolation } from 'styled-components';
import { normalize } from 'polished';

injectGlobal`
  ${normalize() as SimpleInterpolation}
`;

const Loading = () => <p>Loading...</p>;

const Public = Loadable({
  loader: () => import('./Public'),
  loading: Loading,
});

const Admin = Loadable({
  loader: () => import('./Admin'),
  loading: Loading,
});

const Root: SFC = () => (
  <Switch>
    <Route path="/admin" component={Admin} />
    <Route component={Public} />
  </Switch>
);

export default hot(module)(Root);
