import { DocumentResolvers } from '../__generated__/resolvers';
import { TypeMap } from './TypeMap';

const Document: DocumentResolvers.Type<TypeMap> = {
  author: parent => parent.author,
  createdAt: parent => parent.createdAt,
  id: parent => parent.id,
  publishDate: parent => parent.publishDate,
  title: parent => parent.title,
  type: parent => parent.type,
  updatedAt: parent => parent.updatedAt,
};

export default Document;
