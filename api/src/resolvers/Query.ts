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
  documents: async (_parent, _args, { db }) =>
    db
      .withSchema('cmyk')
      .table('document')
      .orderBy('created_at', 'desc')
      .select(),
  files: async (_parent, _args, { db }) =>
    db
      .withSchema('cmyk')
      .table('file')
      .orderBy('created_at', 'desc')
      .select(),
  users: (_parent, _args, { db }) =>
    db
      .withSchema('cmyk')
      .table('user')
      .orderBy('created_at', 'desc')
      .select(),
  user: async (_parent, { id }, { loaders }) => loaders.userById.load(id),
};

export { Query };
