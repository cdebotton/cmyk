import React, { SFC } from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router';
import universal from 'react-universal-component';

const NotFound = universal(import('../NotFound'));

interface Props extends RouteComponentProps<{}> {}

const Public: SFC = () => (
  <Switch>
    <Route component={NotFound} />
  </Switch>
);

export default Public;
