import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { from, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';

const isFile = (value: any) => {
  const file = value.variables.file;
  return (
    (typeof File !== 'undefined' && file instanceof File) ||
    (typeof Blob !== 'undefined' && file instanceof Blob)
  );
};

const cache = new InMemoryCache();

const httpLink = createHttpLink({ uri: 'http://localhost:3002' });

const uploadLink = createUploadLink({ uri: 'http://localhost:3002' });

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

const client = new ApolloClient({
  cache,
  link: split(isFile, from([authLink, uploadLink]), from([authLink, httpLink])),
});

export default client;
