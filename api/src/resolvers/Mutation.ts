import { IResolverObject } from 'graphql-tools';
import { Context } from '../context';
import { MutationSource } from '../models';
import { S3 } from 'aws-sdk';
import jwt from 'jsonwebtoken';
import { compare, hash, genSalt } from 'bcryptjs';
import { PassThrough } from 'stream';

const Mutation: IResolverObject<MutationSource, Context> = {
  login: async (_parent, { email, password }, { db }) => {
    const user = await db
      .table('cmyk.user')
      .where('email', email)
      .select('id', 'hashed_password')
      .first();

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const match = await compare(password, user.hashed_password);

    if (!match) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      'shh',
    );

    return token;
  },
  createUser: async (_parent, { input }, { db }) => {
    const { email, password, repeatPassword, firstName, lastName, role, avatar } = input;

    if (password !== repeatPassword) {
      throw new Error('Password mismatch');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const createUser = await db.transaction(async trx => {
      const [user] = await trx
        .withSchema('cmyk')
        .insert(
          {
            email,
            role,
            hashed_password: hashedPassword,
          },
          '*',
        )
        .into('user');

      await trx
        .withSchema('cmyk')
        .insert(
          {
            first_name: firstName,
            last_name: lastName,
            avatar_id: avatar,
            user_id: user.id,
          },
          '*',
        )
        .into('user_profile');

      return user;
    });

    return createUser;
  },
  updateUser: async (_parent, { id, input }, { db }) => {
    const { email, password, repeatPassword, firstName, lastName, role, avatar } = input;

    const userUpdates: Record<string, string> = { email, role };


    if (password) {
      if (password !== repeatPassword) {
        throw new Error('Password mismatch');
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      userUpdates.hashed_password = hashedPassword;
    }


    const updateUser = await db.transaction(async trx => {
      const [user] = await trx
        .withSchema('cmyk')
        .table('user')
        .where('id', id)
        .update(userUpdates, '*');

      await trx
        .withSchema('cmyk')
        .table('user_profile')
        .where('user_id', id)
        .update({
          first_name: firstName,
          last_name: lastName,
          avatar_id: avatar,
          user_id: id,
        });

        return user;
    });

    return updateUser;
  },
  createDocument: async (_parent, { input }, { db }) => {
    const [createDocument] = await db
      .withSchema('cmyk')
      .table('document')
      .insert(
        {
          title: input.title,
          author_id: input.authorId,
        },
        '*',
      );

    return createDocument;
  },
  deleteDocument: async (_parent, { id }, { db }) => {
    const [deleteDocument] = await db
      .withSchema('cmyk')
      .table('document')
      .where('id', id)
      .delete('*');

    return deleteDocument;
  },
  deleteFile: async (_parent, { id }, { db }) => {
    const s3 = new S3();

    const [deleteFile] = await db
      .withSchema('cmyk')
      .table('file')
      .where('id', id)
      .delete('*');

    await s3.deleteObject({ Key: deleteFile.key, Bucket: deleteFile.bucket }).promise();

    return deleteFile;
  },
  deleteUser: async (_parent, { id }, { db }) => {
    const [deleteUser] = await db
      .withSchema('cmyk')
      .table('user')
      .where('id', id)
      .delete('*');

    return deleteUser;
  },
  uploadFile: async (_parent, { file }, { db }) => {
    const { stream, filename, mimetype, encoding } = await file;
    const passThrough = new PassThrough();
    const s3 = new S3();
    const s3Params = {
      Body: passThrough,
      Bucket: 'debotton.io',
      Key: filename,
    };

    stream.pipe(passThrough);

    const { ETag, Key, Bucket } = await s3.upload(s3Params).promise();

    const [uploadFile] = await db
      .withSchema('cmyk')
      .table('file')
      .insert(
        {
          encoding,
          mimetype,
          bucket: Bucket,
          etag: ETag,
          key: Key,
          size: 0,
        },
        '*',
      );

    return uploadFile;
  },
};

export { Mutation };
