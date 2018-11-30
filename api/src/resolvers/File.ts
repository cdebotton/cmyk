import { IResolverObject } from 'graphql-tools';
import { S3 } from 'aws-sdk';
import { FileSource } from '../models';
import { Context } from '../context';

const File: IResolverObject<FileSource, Context> = {
  createdAt: ({ created_at }) => created_at,
  updatedAt: ({ updated_at }) => updated_at,
  url: ({ bucket, key }) => {
    const s3 = new S3();
    return s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Expires: 300,
      Key: key,
    });
  },
};

export { File };
