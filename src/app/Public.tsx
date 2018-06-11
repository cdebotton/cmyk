import React, { SFC } from 'react';
import { Switch, Route } from 'react-router';
import NotFound from './NotFound';

const Public: SFC = () => (
  <div>
    <Switch>
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Public;
