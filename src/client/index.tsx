import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import Root from '../app/Root';
import JwtContainer from '../containers/JwtContainer';

const mount = document.getElementById('app');
const data = (window as any).__APOLLO_STATE__;

const jwt = localStorage.getItem('jwt');

const authMiddleware = new ApolloLink((operation, forward) => {
  if (jwt) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${jwt}`,
      },
    }));
  }

  return forward!(operation);
});

const httpMiddleware = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({
  link: from([authMiddleware, httpMiddleware]),
  cache: new InMemoryCache().restore(data),
});

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <JwtContainer.Provider jwt={jwt}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ApolloProvider>
    </JwtContainer.Provider>,
    mount,
  );
});
