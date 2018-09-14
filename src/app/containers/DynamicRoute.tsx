import React, { ComponentType, ReactNode } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router';
import componentFetcher from '../utils/componentFetcher';

type Loader<P> = () => Promise<{ default: ComponentType<P> }>;

interface Props<P> extends RouteProps {
  protect?: (routeProps: RouteProps) => ReactNode | undefined;
  renderComponent?: (
    Component: ComponentType<P>,
    routeProps: RouteComponentProps<any>,
  ) => ReactNode;
  loader: Loader<P>;
}

function DynamicRoute<P extends Partial<RouteComponentProps<any>>>({
  loader,
  protect,
  renderComponent,
  ...props
}: Props<P>) {
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

        if (renderComponent) {
          return renderComponent(Component, routeProps);
        }

        return <Component {...routeProps} />;
      }}
    />
  );
}

export default DynamicRoute;
