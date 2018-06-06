import React, { ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';

type Props<T> = {
  isBlocked: boolean;
  redirectOnBlock?: string;
  component: ComponentType<T>;
} & RouteProps;

function ProtectedRoute<T extends RouteProps>({
  isBlocked,
  redirectOnBlock = '/login',
  component: Component,
  ...rest
}: Props<T>) {
  return (
    <Route
      {...rest}
      render={props => {
        if (isBlocked) {
          return (
            <Redirect
              to={{
                pathname: redirectOnBlock,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default ProtectedRoute;
