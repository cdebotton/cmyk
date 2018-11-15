import { S3 } from 'aws-sdk';
import { FileResolvers } from '../generated/graphqlgen';

const File: FileResolvers.Type = {
  ...FileResolvers.defaultResolvers,
  url: ({ url }) => {
    const s3 = new S3();
    const [bucket, ...path] = url.split('/');
    return s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Expires: 300,
      Key: path.join('/'),
    });
  },
};

export default File;
