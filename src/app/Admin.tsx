import React, { SFC, Fragment } from 'react';
import Page from './components/atoms/Page';
import { Switch, Route, RouteComponentProps } from 'react-router';
import PageLoader from './components/molecules/PageLoader';
import AdminNavigation from './components/layouts/AdminNavigation';
import { Link } from 'react-router-dom';
import ProtectedRoute from './containers/ProtectedRoute';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminLogin from './AdminLogin';
import NotFound from './NotFound';

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
