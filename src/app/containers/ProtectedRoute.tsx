import React, { ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';

type Props = {
  isBlocked: boolean;
  redirectOnBlock: string;
  component: ComponentType<any>;
} & RouteProps;

function ProtectedRoute<T extends RouteProps>({
  isBlocked,
  redirectOnBlock,
  component: Component,
  ...rest
}: Props) {
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
