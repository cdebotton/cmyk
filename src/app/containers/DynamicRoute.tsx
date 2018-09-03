import React, { ComponentType } from 'react';
import { RouteProps, Route } from 'react-router';
import componentFetcher from '../utils/componentFetcher';

type Loader<Props> = () => Promise<{ default: ComponentType<Props> }>;

interface Props<P> extends RouteProps {
  loader: Loader<P>;
}

function DynamicRoute<P>({ loader, ...props }: Props<P>) {
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
