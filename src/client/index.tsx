import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from '../app/Root';

const mount = document.getElementById('app');
const data = (window as any).__APOLLO_STATE__;
const cache = new InMemoryCache().restore(data);

const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </ApolloProvider>,
  mount,
);
