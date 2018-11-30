import { IResolverObject } from 'graphql-tools';
import { ProfileSource } from '../models';
import Context from '../Context';

const Profile: IResolverObject<ProfileSource, Context> = {
  avatar: ({ avatar_id }, _args, { fileById }) => (avatar_id ? fileById.load(avatar_id) : null),
  firstName: ({ first_name }) => first_name,
  lastName: ({ last_name }) => last_name,
  lastLogin: ({ last_login }) => last_login,
};

export { Profile };
