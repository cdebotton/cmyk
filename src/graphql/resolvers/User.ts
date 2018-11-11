import { UserResolvers } from '../__generated__/graphqlgen';

const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,
  documents: ({ id }, _args, { db: { user } }) => user({ id }).documents(),
  profile: async ({ id }, _args, { db: { user } }) => user({ id }).profile(),
};

export default User;
