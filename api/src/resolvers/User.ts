import { IResolverObject } from 'graphql-tools';
import { UserSource } from '../models';
import Context from '../Context';

const User: IResolverObject<UserSource, Context> = {
  profile: ({ id }, _args, { profileByUserId }) => profileByUserId.load(id),
  createdAt: ({ created_at }) => created_at,
  updatedAt: ({ updated_at }) => updated_at,
};

export { User };
