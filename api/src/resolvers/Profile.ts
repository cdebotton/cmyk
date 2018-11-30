import { IResolverObject } from 'graphql-tools';
import { ProfileSource } from '../models';
import { Context } from '../context';

const Profile: IResolverObject<ProfileSource, Context> = {
  avatar: ({ avatar_id }, _args, { loaders }) =>
    avatar_id ? loaders.fileById.load(avatar_id) : null,
  firstName: ({ first_name }) => first_name,
  lastName: ({ last_name }) => last_name,
  lastLogin: ({ last_login }) => last_login,
};

export { Profile };
