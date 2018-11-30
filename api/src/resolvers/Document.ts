import { IResolverObject } from 'graphql-tools';
import { DocumentSource } from '../models';
import Context from '../Context';

const Document: IResolverObject<DocumentSource, Context> = {
  createdAt: ({ created_at }) => created_at,
  updatedAt: ({ updated_at }) => updated_at,
  publishedAt: ({ published_at }) => published_at,
  author: ({ author_id }, _args, { userById }) => userById.load(author_id),
};

export { Document };
