import { DocumentResolvers } from '../generated/graphqlgen';

const Document: DocumentResolvers.Type = {
  ...DocumentResolvers.defaultResolvers,
  author: (parent, _args, ctx) => ctx.db.document({ id: parent.id }).author(),
  type: (parent, _args, ctx) => ctx.db.document({ id: parent.id }).type(),
};

export default Document;
