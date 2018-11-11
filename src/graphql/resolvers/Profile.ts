import { ProfileResolvers } from '../__generated__/graphqlgen';

const Profile: ProfileResolvers.Type = {
  ...ProfileResolvers.defaultResolvers,
  avatar: ({ id }, _args, ctx) => ctx.db.profile({ id }).avatar(),
  firstName: ({ id }, _args, ctx) => ctx.db.profile({ id }).firstName(),
  lastName: ({ id }, _args, ctx) => ctx.db.profile({ id }).lastName(),
  user: ({ id }, _args, ctx) => ctx.db.profile({ id }).user(),
};

export default Profile;
