import React, { SFC, Fragment } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import AdminNavigation from './components/organisms/AdminNavigation';
import ProtectedRoute from './containers/ProtectedRoute';
import AdminDashboard from './AdminDashboard';
import AdminDocuments from './AdminDocuments';
import AdminUsers from './AdminUsers';
import NotFound from './NotFound';
import AdminLayout from './components/layouts/AdminLayout';
import SessionContext from './containers/SessionContext';
import { logout } from './lib/Auth';
import Heading from './components/atoms/Heading';
import PageLink from './components/molecules/PageLink';
import faDesktop from '@fortawesome/fontawesome-free-solid/faDesktop';
import faFolderOpen from '@fortawesome/fontawesome-free-solid/faFolderOpen';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';

type Props = RouteComponentProps<{}>;

const Admin: SFC<Props> = ({ match }) => (
  <SessionContext.Consumer>
    {({ session, resetStore }) => (
      <AdminLayout
        navigation={
          <AdminNavigation
            title={<Heading level={1}>CMYK</Heading>}
            pages={
              <Fragment>
                <PageLink to={match.url} icon={faDesktop}>
                  Dashboard
                </PageLink>
                <PageLink to={`${match.url}/documents`} icon={faFolderOpen}>
                  Documents
                </PageLink>
                <PageLink to={`${match.url}/users`} icon={faUsers}>
                  Users
                </PageLink>
              </Fragment>
            }
            actions={
              <Fragment>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    resetStore();
                  }}
                >
                  Logout
                </button>
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
              path={`${match.url}/documents`}
              component={AdminDocuments}
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
  </SessionContext.Consumer>
);

export default Admin;
