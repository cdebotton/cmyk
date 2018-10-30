import React, { lazy, ReactNode, Suspense, useState } from 'react';
import { Route, Switch } from 'react-router';
import Loader from './components/Loader';
import PortalContext from './containers/PortalContext';
import ProtectedRoute from './containers/ProtectedRoute';

const Admin = lazy(() => import('./Admin'));
const Login = lazy(() => import('./Login'));
const NotFound = lazy(() => import('./NotFound'));

function Root() {
  const [portalNode, setPortalNode] = useState<ReactNode>(null);

  return (
    <PortalContext.Provider value={{ portalNode, setPortalNode }}>
      <Suspense maxDuration={300} fallback={<Loader size="large" />}>
        <Switch>
          <ProtectedRoute
            canAccess={session => session !== null}
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
