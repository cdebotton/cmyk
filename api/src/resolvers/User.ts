import { IResolverObject } from 'graphql-tools';
import { UserSource } from '../models';
import { Context } from '../context';

const User: IResolverObject<UserSource, Context> = {
  profile: ({ id }, _args, { loaders }) => loaders.profileByUserId.load(id),
  createdAt: ({ created_at }) => created_at,
  updatedAt: ({ updated_at }) => updated_at,
};

export { User };
