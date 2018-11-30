import { IResolverObject } from 'graphql-tools';
import { S3 } from 'aws-sdk';
import { FileSource } from '../models';
import Context from '../Context';

const File: IResolverObject<FileSource, Context> = {
  createdAt: parent => parent.created_at,
  updatedAt: parent => parent.updated_at,
  url: parent => {
    const s3 = new S3();
    return s3.getSignedUrl('getObject', {
      Bucket: parent.bucket,
      Expires: 300,
      Key: parent.key,
    });
  },
};

export { File };
