import React, { SFC, Fragment } from 'react';
import Page from './components/atoms/Page';
import { Switch, Route, RouteComponentProps } from 'react-router';
import AdminNavigation from './components/layouts/AdminNavigation';
import { Link } from 'react-router-dom';
import ProtectedRoute from './containers/ProtectedRoute';
import universal from 'react-universal-component';

const AdminDashboard = universal(import('./AdminDashboard'));
const AdminUsers = universal(import('./AdminUsers'));
const AdminLogin = universal(import('./AdminLogin'));
const NotFound = universal(import('./NotFound'));

type Props = RouteComponentProps<{}>;

const Admin: SFC<Props> = ({ match }) => (
  <Page>
    <Fragment>
      {true && (
        <AdminNavigation
          pages={
            <Fragment>
              <Link to={match.url}>Dashboard</Link>
              <Link to={`${match.url}/users`}>Users</Link>
            </Fragment>
          }
          actions={
            <Fragment>
              <button type="button">Logout</button>
            </Fragment>
          }
        />
      )}
      <Switch>
        <ProtectedRoute
          exact
          path={match.url}
          component={AdminDashboard}
          isBlocked={false}
          redirectOnBlock={`${match.url}/login`}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/users`}
          component={AdminUsers}
          isBlocked={false}
          redirectOnBlock={`${match.url}/login`}
        />
        <Route path={`${match.url}/login`} component={AdminLogin} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  </Page>
);

export default Admin;
