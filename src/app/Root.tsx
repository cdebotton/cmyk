import React, { SFC } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router';
import {
  injectGlobal,
  SimpleInterpolation,
  ThemeProvider,
} from 'styled-components';
import { normalize } from 'polished';
import Loadable from 'react-loadable';
import PageLoader from './components/molecules/PageLoader';
import SessionContext, { Session } from './containers/SessionContext';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorBoundary from './ErrorBoundary';

const Admin = Loadable({
  loader: () => import('./Admin'),
  loading: () => <PageLoader />,
});

const Login = Loadable({
  loader: () => import('./Login'),
  loading: () => <PageLoader />,
});

const Public = Loadable({
  loader: () => import('./Public'),
  loading: () => <PageLoader />,
});

injectGlobal`
  ${normalize() as SimpleInterpolation};

  body {
    font-family: 'Open sans', sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

const getSessionQuery = gql`
  query GetSession {
    session {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`;

type SessionQueryResponse = {
  session: Session | null;
};

const Root: SFC = () => (
  <ErrorBoundary onError={error => console.log(error)}>
    <Query query={getSessionQuery}>
      {({ data, error, client }: QueryResult<SessionQueryResponse>) => {
        if (!data) {
          return <PageLoader />;
        }

        if (error) {
          console.warn(error);
          return null;
        }

        return (
          <SessionContext.Provider
            value={{ resetStore: client.resetStore, session: data.session }}
          >
            <ThemeProvider theme={{ mode: 'dark' }}>
              <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
                <Route component={Public} />
              </Switch>
            </ThemeProvider>
          </SessionContext.Provider>
        );
      }}
    </Query>
  </ErrorBoundary>
);

export default hot(module)(Root);
