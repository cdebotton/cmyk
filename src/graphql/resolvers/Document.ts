import { DocumentResolvers } from '../generated/graphqlgen';

const Document: DocumentResolvers.Type = {
  ...DocumentResolvers.defaultResolvers,
  author: ({ id }, _args, { db }) => db.document({ id }).author(),
};

export default Document;
