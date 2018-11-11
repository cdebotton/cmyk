module.exports = {
  client: {
    service: {
      localSchemaFile: './src/graphql/schema.graphql',
    },
    includes: ['src/app/**/*.{ts,tsx}'],
  },
};
