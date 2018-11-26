import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';
import { compare, hash, genSalt } from 'bcryptjs';
import Context from './Context';

const { PORT = 3002, ENGINE_API_NAME, ENGINE_API_KEY } = process.env;

const typeDefs = importSchema('src/schema.graphql');

const schema = makeExecutableSchema({
  resolvers: {
    Query: {
      session: async (parent, args, { userId, pool }, info) => {
        if (!userId) {
          return null;
        }

        const client = await pool.connect();

        const {
          rows: [user],
        } = await client.query(
          `
          SELECT u.id, u.email, p.first_name, p.last_name
          FROM User u
          LEFT JOIN cmyk.user_profile p
          ON p.user_id = u.id
          WHERE t.id=$1
        `,
          [userId],
        );

        client.release();

        return user;
      },
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
          return await userById(user.id);
        } catch (error) {
          await client.query('ROLLBACK');
          await client.release();
          throw error;
        }
      },
    },
    User: {
      profile: (parent, args, { profileByUserId }, info) => profileByUserId(parent.id),
    },
    Profile: {
      firstName: parent => parent.first_name,
      lastName: parent => parent.last_name,
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

  return null;
}

const server = new ApolloServer({
  schema,
  context: (ctx: any) => {
    const token = getToken(ctx.req.headers.authorization);

    return new Context(token);
  },
  engine: {
    apiKey: `service:${ENGINE_API_NAME}:${ENGINE_API_KEY}`,
  },
  uploads: true,
});

server.listen(PORT).then(info => {
  process.stdout.write(`Listening at ${info.url}`);
});
