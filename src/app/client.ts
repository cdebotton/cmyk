import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri: 'http://localhost:3002' });
const authLink = setContext((request, previousContext) => {
  const token = localStorage.getItem('jwt');
  return {
    ...previousContext,
    headers: {
      ...previousContext.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const link = ApolloLink.from([authLink, httpLink]);

const client = new ApolloClient({
  cache,
  link,
});

export default client;
