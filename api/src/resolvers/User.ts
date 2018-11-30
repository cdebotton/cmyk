import { IResolverObject } from 'graphql-tools';
import { UserSource } from '../models';
import Context from '../Context';

const User: IResolverObject<UserSource, Context> = {
  profile: (parent, args, { profileByUserId }) => profileByUserId.load(parent.id),
  createdAt: parent => parent.created_at,
  updatedAt: parent => parent.updated_at,
};

export { User };
