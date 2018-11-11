import { S3 } from 'aws-sdk';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PassThrough } from 'stream';
import { MutationResolvers } from '../__generated__/graphqlgen';

const BadCredentials = new Error('Bad credentials');

const Mutation: MutationResolvers.Type = {
  createUser: async (
    _parent,
    { input: { avatar, email, firstName, lastName, role, password, repeatPassword } },
    { db },
  ) => {
    if (password !== repeatPassword) {
      throw new Error('');
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return db.createUser({
      email,
      password: hashedPassword,
      profile: {
        create: {
          firstName,
          lastName,
          avatar: avatar ? { connect: { id: avatar } } : undefined,
        },
      },
    });
  },
  deleteFile: async (_parent, { id }, { db }) => {
    const file = await db.deleteFile({ id });
    const { key, bucket } = file;
    const s3 = new S3();
    await s3.deleteObject({ Key: key, Bucket: bucket }).promise();
    return file;
  },
  deleteUser: async (_parent, { id }, { db }) => {
    return db.deleteUser({ id });
  },
  login: async (_parent, { input: { email, password } }, { db }) => {
    const user = await db.user({ email });

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
  updateUser: async (_parent, { id, input }, { db }) => {
    return db.updateUser({
      where: { id },
      data: {
        email: input.email,
        role: input.role,
        profile: {
          update: {
            firstName: input.firstName,
            lastName: input.lastName,
            avatar: input.avatar
              ? {
                  connect: {
                    id: input.avatar,
                  },
                }
              : undefined,
          },
        },
      },
    });
  },
  uploadFile: async (_parent, { file }, { db }, info) => {
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

    return db.createFile({
      encoding,
      mimetype,
      bucket: Bucket,
      etag: ETag,
      key: Key,
      size: 0,
      url: `${Bucket}/${Key}`,
    });
  },
  createDocument: (_parent, { input }, { db }) => {
    return db.createDocument({
      title: input.title,
      type: { connect: { id: input.type } },
      publishDate: input.publishDate,
    });
  },
  updateDocument: (_parent, { input, id }, { db }) => {
    return db.updateDocument({
      where: { id },
      data: {
        title: input.title,
        publishDate: input.publishDate,
      },
    });
  },
};

export default Mutation;
