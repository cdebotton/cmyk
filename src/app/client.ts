import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

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
