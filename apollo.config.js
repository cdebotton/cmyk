module.exports = {
  client: {
    service: {
      localSchemaFile: './api/src/schema.graphql',
    },
    includes: ['./app/src/**/*.{ts,tsx}'],
  },
};
