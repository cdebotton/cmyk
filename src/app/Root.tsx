import React, { Placeholder } from 'react';
import { hot } from 'react-hot-loader';
import { Switch } from 'react-router';
import DynamicRoute from './containers/DynamicRoute';
import Loader, { LoaderSize } from './components/Loader';

function Root() {
  return (
    <Placeholder delayMs={300} fallback={<Loader size={LoaderSize.Large} />}>
      <Switch>
        <DynamicRoute path="/admin" loader={() => import('./Admin')} />
      </Switch>
    </Placeholder>
  );
}

export default hot(module)(Root);
