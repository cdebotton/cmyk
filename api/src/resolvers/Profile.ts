import { IResolverObject } from 'graphql-tools';
import { ProfileSource } from '../models';
import Context from '../Context';

const Profile: IResolverObject<ProfileSource, Context> = {
  avatar: (parent, args, { fileById }) =>
    parent.avatar_id ? fileById.load(parent.avatar_id) : null,
  firstName: parent => parent.first_name,
  lastName: parent => parent.last_name,
  lastLogin: parent => parent.last_login,
};

export { Profile };
