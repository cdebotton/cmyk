import React, { SFC } from 'react';
import Loadable from 'react-loadable';
import Page from '../components/atoms/Page';
import { Switch, Route } from 'react-router';
import PageLoader from '../components/molecules/PageLoader';

const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: () => <PageLoader />,
});

const Public: SFC = () => (
  <Page>
    <Switch>
      <Route component={NotFound} />
    </Switch>
  </Page>
);

export default Public;
