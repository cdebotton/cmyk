import React, { SFC, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import Page from '../components/atoms/Page';
import { Switch, Route, RouteComponentProps } from 'react-router';
import PageLoader from '../components/molecules/PageLoader';
import AdminNavigation from '../components/organisms/AdminNavigation';
import { NavLink } from 'react-router-dom';

const AdminDashboard = Loadable({
  loader: () => import('./AdminDashboard'),
  loading: () => <PageLoader />,
});

const AdminLogin = Loadable({
  loader: () => import('./AdminLogin'),
  loading: () => <PageLoader />,
});

const AdminUsers = Loadable({
  loader: () => import('./AdminUsers'),
  loading: () => <PageLoader />,
});

const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: () => <PageLoader />,
});

type Props = RouteComponentProps<{}>;

const Admin: SFC<Props> = ({ match }) => (
  <Page>
    <AdminNavigation
      pageLinks={
        <Fragment>
          <NavLink to={match.url}>Dashboard</NavLink>
          <NavLink to={`${match.url}/users`}>Users</NavLink>
        </Fragment>
      }
    />
    <Switch>
      <Route exact path={match.url} component={AdminDashboard} />
      <Route path={`${match.url}/users`} component={AdminUsers} />
      <Route path={`${match.url}/login`} component={AdminLogin} />
      <Route component={NotFound} />
    </Switch>
  </Page>
);

export default hot(module)(Admin);
