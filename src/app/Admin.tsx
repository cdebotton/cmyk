import React, { SFC, Fragment } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import AdminNavigation from './components/layouts/AdminNavigation';
import ProtectedRoute from './containers/ProtectedRoute';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import NotFound from './NotFound';
import AdminLayout from './components/layouts/AdminLayout';
import Session from './containers/Session';

type Props = RouteComponentProps<{}>;

const Admin: SFC<Props> = ({ match }) => (
  <Session.Consumer>
    {session => (
      <AdminLayout
        navigation={
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
        }
        content={
          <Switch>
            <ProtectedRoute
              exact
              path={match.url}
              component={AdminDashboard}
              isBlocked={session === null}
            />
            <ProtectedRoute
              exact
              path={`${match.url}/users`}
              component={AdminUsers}
              isBlocked={session === null}
            />
            <Route component={NotFound} />
          </Switch>
        }
      />
    )}
  </Session.Consumer>
);

export default Admin;
