import { S3 } from 'aws-sdk';
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
  url: parent => {
    const s3 = new S3();
    const [bucket, ...path] = parent.url.split('/');
    return s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Expires: 300,
      Key: path.join('/'),
    });
  },
};

export default File;
