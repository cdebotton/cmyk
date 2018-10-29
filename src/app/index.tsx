import React, { ConcurrentMode } from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import client from './client';
import Root from './Root';

const app = document.getElementById('app');
const portal = document.getElementById('portal');

if (!app) {
  throw new Error(`Root element "#app" doesn't exist on the DOM`);
}

if (!portal) {
  throw new Error(`Root element "#portal" doesn't exist on the DOM`);
}

render(
  <ConcurrentMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>
  </ConcurrentMode>,
  app,
);
