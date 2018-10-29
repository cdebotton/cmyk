import gql from 'graphql-tag';
import React, { lazy, ReactNode, Suspense, useState } from 'react';
import { Query } from 'react-apollo';
import { Redirect, Route, RouteProps, Switch } from 'react-router';
import { Session } from './__generated__/Session';
import Loader, { LoaderSize } from './components/Loader';
import PortalContext from './containers/PortalContext';

const SESSION_QUERY = gql`
  query Session {
    session {
      iat
    }
  }
`;

function isLoggedIn(data: Session | null) {
  return (props: RouteProps) => {
    if (!data || data.session === null) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              attempt: props.location,
            },
          }}
        />
      );
    }
  };
}

const Admin = lazy(() => import('./Admin'));
const Login = lazy(() => import('./Login'));
const NotFound = lazy(() => import('./NotFound'));

function Root() {
  const [portalNode, setPortalNode] = useState<ReactNode>(null);

  return (
    <Query<Session, {}> query={SESSION_QUERY}>
      {({ data, error, loading }) => {
        if (error) {
          return null;
        }

        if (loading || !data) {
          return 'Loading...';
        }

        return (
          <PortalContext.Provider value={{ portalNode, setPortalNode }}>
            <Suspense
              maxDuration={300}
              fallback={<Loader size={LoaderSize.Large} />}
            >
              <Switch>
                <Route
                  protect={isLoggedIn(data)}
                  path="/admin"
                  component={Admin}
                />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </PortalContext.Provider>
        );
      }}
    </Query>
  );
}

export default Root;
