import { QueryResolvers } from '../generated/graphqlgen';

const Query: QueryResolvers.Type = {
  document: (_parent, { id }, { db }) => db.document({ id }),
  documents: (_parent, _args, { db }) => db.documents(),
  files: (_parent, _args, { db }) => db.files(),
  session: (_parent, _args, { session }) => session,
  user: (_parent, { id }, { db }) => db.user({ id }),
  users: (_parent, _args, { db }) => db.users(),
};

export default Query;
