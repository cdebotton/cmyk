import React, { ConcurrentMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import client from './client';
import { ApolloProvider } from './hooks/useApollo';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

const app = document.getElementById('root');
const portal = document.getElementById('portal');

if (!app) {
  throw new Error(`Root element "#app" doesn't exist on the DOM`);
}

if (!portal) {
  throw new Error(`Root element "#portal" doesn't exist on the DOM`);
}

ReactDOM.createRoot(app).render(
  <ConcurrentMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>
  </ConcurrentMode>,
);

serviceWorker.unregister();
