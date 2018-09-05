module.exports = {
  schemas: {
    gql: {
      schema: 'schema.json',
      endpoint: 'http://localhost:3002',
    },
  },
  queries: [
    {
      schema: 'gql',
      includes: ['src/app/**/*.tsx'],
      excludes: ['node_modules/**'],
    },
  ],
};
