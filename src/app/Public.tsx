import React, { SFC } from 'react';
import Page from './components/atoms/Page';
import { Switch, Route } from 'react-router';
import NotFound from './NotFound';

const Public: SFC = () => (
  <Page>
    <Switch>
      <Route component={NotFound} />
    </Switch>
  </Page>
);

export default Public;
