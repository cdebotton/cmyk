import React, { lazy, ReactNode, Suspense, useState } from 'react';
import { Route, Switch } from 'react-router';
import Loader, { LoaderSize } from './components/Loader';
import PortalContext from './containers/PortalContext';

const Admin = lazy(() => import('./Admin'));
const Login = lazy(() => import('./Login'));
const NotFound = lazy(() => import('./NotFound'));

function Root() {
  const [portalNode, setPortalNode] = useState<ReactNode>(null);

  return (
    <PortalContext.Provider value={{ portalNode, setPortalNode }}>
      <Suspense maxDuration={300} fallback={<Loader size={LoaderSize.Large} />}>
        <Switch>
          <Route
            // protect={(session, props) => {
            //   if (!session) {
            //     return (
            //       <Redirect
            //         to={{
            //           pathname: '/login',
            //           state: {
            //             attempt: props.location,
            //           },
            //         }}
            //       />
            //     );
            //   }
            // }}
            path="/admin"
            component={Admin}
          />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </PortalContext.Provider>
  );
}

export default Root;
