import gql from 'graphql-tag';
import React, { Placeholder } from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { Redirect, RouteProps, Switch } from 'react-router';
import { Session } from './__generated__/Session';
import Loader, { LoaderSize } from './components/Loader';
import DynamicRoute from './containers/DynamicRoute';

const SESSION_QUERY = gql`
  query Session {
    session {
      iat
      user {
        id
        email
      }
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

function Root() {
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
          <Placeholder
            delayMs={300}
            fallback={<Loader size={LoaderSize.Large} />}
          >
            <Switch>
              <DynamicRoute
                protect={isLoggedIn(data)}
                path="/admin"
                loader={() => import('./Admin')}
              />
              <DynamicRoute path="/login" loader={() => import('./Login')} />
              <DynamicRoute loader={() => import('./NotFound')} />
            </Switch>
          </Placeholder>
        );
      }}
    </Query>
  );
}

export default hot(module)(Root);
