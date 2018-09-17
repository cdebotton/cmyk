import { ProfileResolvers } from '../__generated__/resolvers';
import { TypeMap } from './TypeMap';

const Profile: ProfileResolvers.Type<TypeMap> = {
  avatar: parent => parent.avatar,
  createdAt: parent => parent.createdAt,
  dateOfBirth: parent => parent.dateOfBirth,
  firstName: parent => parent.firstName,
  id: parent => parent.id,
  lastName: parent => parent.lastName,
  updatedAt: parent => parent.updatedAt,
  user: parent => parent.user,
};

export default Profile;
