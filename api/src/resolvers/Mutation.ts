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
    const userId = await db.transaction(async trx => {
      try {
        const userId = await db
          .withSchema('cmyk')
          .table('user')
          .insert(
            {
              email,
              role,
              hashed_password: hashedPassword,
            },
            'id',
          );

        await db
          .withSchema('cmyk')
          .table('user_profile')
          .insert({
            firstName,
            lastName,
            avatar_id: avatar,
            user_id: userId,
            hashed_password: hashedPassword,
          });

        trx.commit();
        return userId;
      } catch (err) {
        trx.rollback();
        throw err;
      }
    });

    return userId;
  },
  updateUser: async (_parent, { id, input }, { db }) => {
    const { email, password, repeatPassword, firstName, lastName, role, avatar } = input;

    if (password !== repeatPassword) {
      throw new Error('Password mismatch');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const user = await db.transaction(async trx => {
      try {
        const user = db
          .withSchema('cmyk')
          .table('user')
          .where('id', id)
          .update(
            {
              email,
              role,
            },
            '*',
          );

        const profile = db
          .withSchema('cmyk')
          .table('user_profile')
          .where('user_id', id)
          .update({
            email,
            role,
            user_id: id,
            hashed_password: hashedPassword,
          });

        await Promise.all([user, profile]);

        trx.commit();
        return user;
      } catch (err) {
        trx.rollback();
        throw err;
      }
    });

    return user;
  },
  createDocument: async (_parent, { input }, { db }) => {
    const createDocument = await db
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
    const deleteDocument = await db
      .withSchema('cmyk')
      .table('document')
      .where('id', id)
      .delete('*');

    return deleteDocument;
  },
  deleteFile: async (_parent, { id }, { db }) => {
    const s3 = new S3();

    const deleteFile = await db
      .withSchema('cmyk')
      .table('file')
      .where('id', id)
      .delete('*');

    await s3.deleteObject({ Key: deleteFile.key, Bucket: deleteFile.bucket }).promise();

    return deleteFile;
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

    const uploadFile = await db
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
