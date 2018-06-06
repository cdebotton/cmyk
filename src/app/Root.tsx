import React, { SFC } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router';
import { injectGlobal, SimpleInterpolation } from 'styled-components';
import { normalize } from 'polished';
import Loadable from 'react-loadable';
import PageLoader from './components/molecules/PageLoader';
import Session from './containers/Session';
import { ApolloError } from 'apollo-client';

const Admin = Loadable({
  loader: () => import('./Admin'),
  loading: () => <PageLoader />,
});

const Login = Loadable({
  loader: () => import('./Login'),
  loading: () => <PageLoader />,
});

const Public = Loadable({
  loader: () => import('./Public'),
  loading: () => <PageLoader />,
});

injectGlobal`
  ${normalize() as SimpleInterpolation};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

const ErrorComponent: SFC<{ error: ApolloError }> = () => (
  <div>
    <p>Uh oh</p>
  </div>
);

const Root: SFC = () => (
  <Session.Provider loading={PageLoader} error={ErrorComponent}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route component={Public} />
    </Switch>
  </Session.Provider>
);

export default hot(module)(Root);
