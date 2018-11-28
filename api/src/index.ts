import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';
import { compare, hash, genSalt } from 'bcryptjs';
import Context from './Context';
import { Pool } from 'pg';
import { S3 } from 'aws-sdk';
import { PassThrough } from 'stream';

const { PORT = 3002, ENGINE_API_NAME, ENGINE_API_KEY } = process.env;

const typeDefs = importSchema('src/schema.graphql');

const schema = makeExecutableSchema({
  resolvers: {
    Query: {
      session: async (parent, args, { token, pool, userById }, info) => {
        if (!token) {
          return null;
        }

        const client = await pool.connect();

        const { rows } = await client.query(
          `
          SELECT u.id
          FROM cmyk.user u
          WHERE u.id=$1
        `,
          [token.userId],
        );

        const user = await userById.load(rows[0].id);

        client.release();

        return {
          ...token,
          user,
        };
      },
      documents: () => [],
      files: async (parent, args, { pool }, info) => {
        const client = await pool.connect();

        const query = 'SELECT * FROM cmyk.file';
        const { rows } = await client.query(query);

        client.release();

        return rows;
      },
      users: async (parent, args, { pool }, info) => {
        const client = await pool.connect();
        const { rows } = await client.query('SELECT * FROM cmyk.user');
        // console.log(rows);
        return rows;
      },
      user: async (parent, { id }, { userById }, info) => userById.load(id),
    },
    Mutation: {
      login: async (parent, { email, password }, { pool }, info) => {
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
      createUser: async (parent, { input }, { pool, userById }, info) => {
        const { email, password, repeatPassword, firstName, lastName, role } = input;

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
            'INSERT INTO cmyk.user_profile(user_id, first_name, last_name) VALUES($1, $2, $3)',
            [user.id, firstName, lastName],
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
      deleteFile: async (parent, { id }, { pool }, info) => {
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
      uploadFile: async (parent, { file }, { pool }) => {
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
    },
    User: {
      profile: (parent, args, { profileByUserId }) => profileByUserId.load(parent.id),
      createdAt: parent => parent.created_at,
      updatedAt: parent => parent.updated_at,
    },
    Profile: {
      avatar: (parent, args, { fileById }) =>
        parent.avatar_id ? fileById.load(parent.avatar_id) : null,
      firstName: parent => parent.first_name,
      lastName: parent => parent.last_name,
      lastLogin: parent => parent.last_login,
    },
    File: {
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
    },
  },
  typeDefs,
});

interface IToken {
  iat: string;
  userId: string;
}

function getToken(authorization?: string): IToken | null {
  if (!authorization) {
    return null;
  }

  const token = authorization.split(' ')[1];
  let decoded = jwt.verify(token, 'shh');

  if (!decoded) {
    return null;
  }

  if (typeof decoded === 'string') {
    try {
      return JSON.parse(decoded) as IToken;
    } catch {
      return null;
    }
  }

  return decoded as IToken;
}

const pool = new Pool();

const server = new ApolloServer({
  schema,
  context: (ctx: any) => {
    const token = getToken(ctx.req.headers.authorization);

    return new Context(token, pool);
  },
  engine: {
    apiKey: `service:${ENGINE_API_NAME}:${ENGINE_API_KEY}`,
  },
  uploads: true,
});

server.listen(PORT).then(info => {
  process.stdout.write(`Listening at ${info.url}`);
});
