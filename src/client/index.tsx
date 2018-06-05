import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { from } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import Root from '../app/Root';

const mount = document.getElementById('app');
const data = (window as any).__APOLLO_STATE__;
const cache = new InMemoryCache().restore(data);

const typeDefs = `
type Query {
  jwt: String
}

type Mutation {
  updateJwt(jwt: String): String
}
`;

const stateLink = withClientState({
  typeDefs: typeDefs,
  resolvers: {
    Query: {
      jwt: () => localStorage.getItem('token'),
    },
    Mutation: {
      updateJwt: (jwt: string) => {
        localStorage.setItem('token', jwt);
        return jwt;
      },
    },
  },
});

const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'include',
});

const authLink = setContext((operation, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, stateLink, httpLink]),
  cache,
});

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>,
    mount,
  );
});
