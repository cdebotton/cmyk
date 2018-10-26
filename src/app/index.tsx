import React, { ConcurrentMode } from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import client from './client';
import PortalManager from './containers/PortalManager';
import Root from './Root';

const element = document.getElementById('app');
const portal = document.getElementById('portal');

if (!element) {
  throw new Error(`Root element "#app" doesn't exist on the DOM`);
}

render(
  <ConcurrentMode>
    <PortalManager.Provider element={portal}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ApolloProvider>
    </PortalManager.Provider>
  </ConcurrentMode>,
  element,
);
