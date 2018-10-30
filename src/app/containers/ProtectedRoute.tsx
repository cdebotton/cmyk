import gql from 'graphql-tag';
import React, { ReactNode } from 'react';
import { StaticContext } from 'react-router';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { Session, Session_session } from '../__generated__/Session';
import { useApolloQuery } from '../hooks/Apollo';

interface Props extends RouteProps {
  canAccess: (session: Session_session | null) => boolean;
  children?: ((
    props: RouteComponentProps<any, StaticContext, any>,
  ) => ReactNode);
}

const query = gql`
  query Session {
    session {
      iat
      user {
        id
      }
    }
  }
`;

function ProtectedRoute({
  canAccess,
  component: Component,
  children,
  render,
  ...rest
}: Props) {
  const {
    data: { session },
  } = useApolloQuery<Session>(query);

  return (
    <Route
      {...rest}
      render={props => {
        if (!canAccess(session)) {
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

        if (Component) {
          return <Component {...props} />;
        }

        if (render) {
          return render(props);
        }

        if (typeof children === 'function') {
          return children(props);
        }

        return null;
      }}
    />
  );
}

export default ProtectedRoute;
