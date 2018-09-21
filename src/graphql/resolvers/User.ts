import { UserResolvers } from '../__generated__/resolvers';
import { TypeMap } from './TypeMap';

const Session: UserResolvers.Type<TypeMap> = {
  createdAt: parent => parent.createdAt,
  documents: parent => parent.documents,
  email: parent => parent.email,
  id: parent => parent.id,
  lastLogin: parent => parent.lastLogin,
  password: parent => parent.password,
  profile: async (parent, args, { db }, info) => {
    const [profile] = await db.query.profiles(
      {
        where: { user: { id: parent.id } },
      },
      info,
    );

    return profile;
  },
  role: parent => parent.role,
  updatedAt: parent => parent.updatedAt,
};

export default Session;
