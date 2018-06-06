import React, { SFC } from 'react';
import universal from 'react-universal-component';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router';
import { injectGlobal, SimpleInterpolation } from 'styled-components';
import { normalize } from 'polished';

const Admin = universal(import('./Admin'));
const Public = universal(import('./Public'));

injectGlobal`
  ${normalize() as SimpleInterpolation}
`;

const Root: SFC = () => (
  <Switch>
    <Route path="/admin" component={Admin} />
    <Route component={Public} />
  </Switch>
);

export default hot(module)(Root);
