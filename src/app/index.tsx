import React, { SFC, StrictMode } from 'react';
import { hot } from 'react-hot-loader';

import { normalize } from 'polished';
import { injectGlobal, SimpleInterpolation } from 'styled-components';
import { Route, Switch } from 'react-router';
import universal from 'react-universal-component';

injectGlobal`
  ${normalize() as SimpleInterpolation};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  #app {
    position: relative;
    overflow: auto;
    width: 100vw;
    min-height: 100vh;
  }

  a {
    color: inherit;
  }
`;

const Admin = universal(import('./Admin'));
const Public = universal(import('./Public'));

const Root: SFC = () => (
  <Switch>
    <Route path="/admin" component={Admin} />
    <Route component={Public} />
  </Switch>
);

export default hot(module)(Root);
