import { S3 } from 'aws-sdk';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PassThrough } from 'stream';
import { MutationResolvers } from '../__generated__/resolvers';
import { TypeMap } from './TypeMap';

const BadCredentials = new Error('Bad credentials');

const Mutation: MutationResolvers.Type<TypeMap> = {
  createUser: async (parent, { data }, { db }, info) => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(data.password, salt);

    return db.mutation.createUser(
      {
        data: {
          ...data,
          password: hashedPassword,
        },
      },
      info,
    );
  },
  deleteFile: async (parent, { where }, { db }, info) => {
    const file = await db.mutation.deleteFile({ where });
    const { key, bucket } = file;
    const s3 = new S3();
    await s3.deleteObject({ Key: key, Bucket: bucket }).promise();
    return file;
  },
  deleteUser: async (parent, { where }, { db }, info) => {
    return db.mutation.deleteUser({ where }, info);
  },
  login: async (parent, { data: { email, password } }, { db }, info) => {
    const user = await db.query.user({ where: { email } });

    if (!user) {
      throw BadCredentials;
    }

    const ok = await compare(password, user.password);

    if (!ok) {
      throw BadCredentials;
    }

    const token = sign({ userId: user.id }, 'shh');

    return token;
  },
  updateUser: async (parent, { where, data }, { db }, info) => {
    return db.mutation.updateUser({ where, data }, info);
  },
  uploadFile: async (parent, { file }, { db }, info) => {
    // @ts-ignore
    const { stream, filename, mimetype, encoding } = await file;
    const passThrough = new PassThrough();
    stream.pipe(passThrough);

    const s3 = new S3();
    const s3Params = {
      Body: passThrough,
      Bucket: 'debotton.io',
      Key: filename,
    };
    const { ETag, Key, Bucket } = await s3.upload(s3Params).promise();

    return db.mutation.createFile(
      {
        data: {
          encoding,
          mimetype,
          bucket: Bucket,
          etag: ETag,
          key: Key,
          size: 0,
          url: `${Bucket}/${Key}`,
        },
      },
      info,
    );
  },
};

export default Mutation;
