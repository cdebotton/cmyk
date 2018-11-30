import { IResolverObject } from 'graphql-tools';
import { Context } from '../context';
import { QuerySource } from '../models';

const Query: IResolverObject<QuerySource, Context> = {
  session: async (_parent, _args, { token, loaders }) => {
    if (!token) {
      return null;
    }

    const user = await loaders.userById.load(token.userId);

    return {
      ...token,
      user,
    };
  },
  documents: async (_parent, _args, { db }) => db.documents(),
  files: async (_parent, _args, { db }) => db.files(),
  users: (_parent, _args, { db }) => db.users(),
  user: async (_parent, { id }, { loaders }) => loaders.userById.load(id),
};

export { Query };
