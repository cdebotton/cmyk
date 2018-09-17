import { FileResolvers } from '../__generated__/resolvers';
import { TypeMap } from './TypeMap';

const File: FileResolvers.Type<TypeMap> = {
  bucket: parent => parent.bucket,
  createdAt: parent => parent.createdAt,
  encoding: parent => parent.encoding,
  etag: parent => parent.etag,
  id: parent => parent.id,
  key: parent => parent.key,
  mimetype: parent => parent.mimetype,
  size: parent => parent.size,
  updatedAt: parent => parent.updatedAt,
};

export default File;
