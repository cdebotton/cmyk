import React, { ComponentType, ReactNode } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router';
import componentFetcher from '../utils/componentFetcher';

type Loader<P> = () => Promise<{ default: ComponentType<P> }>;

interface IProps<P> extends RouteProps {
  protect?: (routeProps: RouteProps) => ReactNode | undefined;
  loader: Loader<P>;
}

function DynamicRoute<P extends Partial<RouteComponentProps<any, any, any>>>({
  loader,
  protect,
  ...props
}: IProps<P>) {
  const Component = componentFetcher(loader);
  return (
    <Route
      {...props}
      render={routeProps => {
        if (protect) {
          const blocked = protect(routeProps);
          if (blocked) {
            return blocked;
          }
        }

        return <Component {...routeProps} />;
      }}
    />
  );
}

export default DynamicRoute;
