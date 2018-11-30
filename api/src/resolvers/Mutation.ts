import { IResolverObject } from 'graphql-tools';
import { S3 } from 'aws-sdk';
import jwt from 'jsonwebtoken';
import { compare, hash, genSalt } from 'bcryptjs';
import { PassThrough } from 'stream';
import Context from '../Context';
import { MutationSource } from '../models';

const Mutation: IResolverObject<MutationSource, Context> = {
  login: async (parent, { email, password }, { pool }) => {
    const client = await pool.connect();

    const {
      rows: [user],
    } = await client.query(
      `
      SELECT u.id, u.hashed_password
      FROM cmyk.user u
      WHERE u.email=$1
    `,
      [email],
    );

    client.release();

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
  createUser: async (parent, { input }, { pool, userById }) => {
    const { email, password, repeatPassword, firstName, lastName, role, avatar } = input;

    if (password !== repeatPassword) {
      throw new Error('Password mismatch');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const {
        rows: [user],
      } = await client.query(
        'INSERT INTO cmyk.user(email, hashed_password, role) VALUES($1, $2, $3) RETURNING id',
        [email, hashedPassword, role],
      );

      await client.query(
        'INSERT INTO cmyk.user_profile(user_id, first_name, last_name, avatar_id) VALUES($1, $2, $3, $4)',
        [user.id, firstName, lastName, avatar],
      );

      await client.query('COMMIT');
      await client.release();
      return await userById.load(user.id);
    } catch (error) {
      await client.query('ROLLBACK');
      await client.release();
      throw error;
    }
  },
  updateUser: async (parent, { id, input }, { pool }) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query('UPDATE cmyk.user SET email = $1, role = $2 WHERE id = $3', [
        input.email,
        input.role,
        id,
      ]);

      await client.query(
        'UPDATE cmyk.user_profile SET first_name = $1, last_name = $2, avatar_id = $3 WHERE user_id = $4',
        [input.firstName, input.lastName, input.avatar, id],
      );

      await client.query('COMMIT');
    } catch {
      await client.query('ROLLBACK');
    }
    client.release();
  },
  createDocument: async (parent, { input }, { pool }) => {
    const client = await pool.connect();

    const query = `
      INSERT INTO cmyk.document(title, author_id)
      VALUES($1, $2)
    `;

    const params = [input.title, input.authorId];

    const {
      rows: [document],
    } = await client.query(query, params);

    client.release();

    return document;
  },
  deleteDocument: async (parent, { id }, { pool }) => {
    const client = await pool.connect();

    const query = 'DELETE FROM cmyk.document WHERE id = $1 RETURNING *';
    const params = [id];

    const {
      rows: [document],
    } = await client.query(query, params);

    client.release();

    return document;
  },
  deleteFile: async (parent, { id }, { pool }) => {
    const s3 = new S3();
    const client = await pool.connect();

    const query = 'DELETE FROM cmyk.file WHERE id = $1 RETURNING *';
    const params = [id];
    const { rows } = await client.query(query, params);
    const [file] = rows;

    await s3.deleteObject({ Key: file.key, Bucket: file.bucket }).promise();

    client.release();

    return file;
  },
  uploadFile: async (_parent, { file }, { pool }) => {
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

    const client = await pool.connect();
    const query = `INSERT INTO cmyk.file(encoding, mimetype, bucket, etag, key, size) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    const params = [encoding, mimetype, Bucket, ETag, Key, 0];

    const { rows } = await client.query(query, params);
    client.release();

    return rows[0];
  },
};

export { Mutation };
