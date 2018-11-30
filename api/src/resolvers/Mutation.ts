import { IResolverObject } from 'graphql-tools';
import { Context } from '../context';
import { MutationSource } from '../models';

const Mutation: IResolverObject<MutationSource, Context> = {
  login: async (_parent, { email, password }, { db }) => db.login(email, password),
  createUser: async (_parent, { input }, { db, loaders }) => {
    const userId = await db.createUser(input);
    return await loaders.userById.load(userId);
  },
  updateUser: async (_parent, { id, input }, { db, loaders }) => {
    await db.updateUser(id, input);
    return await loaders.userById.load(id);
  },
  createDocument: async (_parent, { input }, { db }) => db.createDocument(input),
  deleteDocument: async (_parent, { id }, { db }) => db.deleteDocument(id),
  deleteFile: async (_parent, { id }, { db }) => db.deleteFile(id),
  uploadFile: async (_parent, { file }, { db }) => db.uploadFile(file),
};

export { Mutation };
