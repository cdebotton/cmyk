import React, { SFC } from 'react';
import Loadable from 'react-loadable';
import Page from '../components/atoms/Page';
import { Switch, Route, RouteComponentProps } from 'react-router';
import PageLoader from '../components/molecules/PageLoader';

const AdminDashboard = Loadable({
  loader: () => import('./AdminDashboard'),
  loading: () => <PageLoader />,
});

const AdminLogin = Loadable({
  loader: () => import('./AdminLogin'),
  loading: () => <PageLoader />,
});

const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: () => <PageLoader />,
});

type Props = RouteComponentProps<{}>;

const Admin: SFC<Props> = ({ match }) => (
  <Page>
    <Switch>
      <Route exact path={match.url} component={AdminDashboard} />
      <Route path={`${match.url}/login`} component={AdminLogin} />
      <Route component={NotFound} />
    </Switch>
  </Page>
);

export default Admin;
