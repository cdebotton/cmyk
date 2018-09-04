import React, { ComponentType } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router';
import componentFetcher from '../utils/componentFetcher';

type Loader<P> = () => Promise<{ default: ComponentType<P> }>;

interface IProps<P> extends RouteProps {
  loader: Loader<P>;
}

function DynamicRoute<P extends Partial<RouteComponentProps<any, any, any>>>({
  loader,
  ...props
}: IProps<P>) {
  const Component = componentFetcher(loader);
  return (
    <Route
      {...props}
      render={routeProps => {
        return <Component {...routeProps} />;
      }}
    />
  );
}

export default DynamicRoute;
