import { IResolverObject } from 'graphql-tools';
import { S3 } from 'aws-sdk';
import { FileSource } from '../models';
import { Context } from '../context';

type Options = {
  bucket: string;
  key: string;
};

function getSignedUrl({ bucket, key }: Options) {
  const s3 = new S3();
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'getObject',
      {
        Bucket: bucket,
        Expires: 300,
        Key: key,
      },
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      },
    );
  });
}

const File: IResolverObject<FileSource, Context> = {
  createdAt: ({ created_at }) => created_at,
  updatedAt: ({ updated_at }) => updated_at,
  url: ({ bucket, key }) => getSignedUrl({ bucket, key }),
};

export { File };
