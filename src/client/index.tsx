import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import Root from '../app/Root';
import SessionProvider from '../app/containers/SessionProvider';

const mount = document.getElementById('app');
const data = (window as any).__APOLLO_STATE__;
const session = (window as any).__SESSION__;
const cache = new InMemoryCache().restore(data);

const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <SessionProvider session={session}>
          <Root />
        </SessionProvider>
      </BrowserRouter>
    </ApolloProvider>,
    mount,
  );
});
