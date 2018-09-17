import { QueryResolvers } from '../__generated__/resolvers';
import { TypeMap } from './TypeMap';

const Query: QueryResolvers.Type<TypeMap> = {
  session: (parent, args, ctx, info) => ctx.session,
  user: (parent, args, ctx, info) => ctx.db.query.user(args, info),
  users: (parent, args, ctx, info) => ctx.db.query.users(args, info),
};

export default Query;
