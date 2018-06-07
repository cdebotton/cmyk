import React, { SFC, Fragment } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';

import faDesktop from '@fortawesome/fontawesome-free-solid/faDesktop';
import faSiteMap from '@fortawesome/fontawesome-free-solid/faSiteMap';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSignOut from '@fortawesome/fontawesome-free-solid/faSignOutAlt';

import AdminDashboard from './AdminDashboard';
import AdminDocuments from './AdminDocuments';
import AdminUsers from './AdminUsers';
import NotFound from './NotFound';

import AdminLayout from './components/layouts/AdminLayout';
import Heading from './components/atoms/Heading';
import PageLink from './components/molecules/PageLink';

import ProtectedRoute from './containers/ProtectedRoute';
import SessionContext from './containers/SessionContext';

import { logout } from './lib/Auth';
import AdminNavBar from './components/organisms/AdminNavBar';

type Props = RouteComponentProps<{}>;

const Admin: SFC<Props> = ({ match }) => (
  <SessionContext.Consumer>
    {({ session, resetStore }) => (
      <AdminLayout
        title={<Heading level={1}>CMYK</Heading>}
        navigation={
          <AdminNavBar
            pages={
              <Fragment>
                <PageLink exact to={match.url} icon={faDesktop} />
                <PageLink to={`${match.url}/documents`} icon={faSiteMap} />
                <PageLink to={`${match.url}/users`} icon={faUsers} />
              </Fragment>
            }
            actions={
              <button
                type="button"
                onClick={() => {
                  logout();
                  resetStore();
                }}
              >
                <FontAwesomeIcon icon={faSignOut} />
              </button>
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
