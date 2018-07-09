import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Context as KoaContext } from 'koa';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { Prisma } from 'prisma-binding';
import getTokenFromAuthorization from './libs/getTokenFromHeader';
import { InvalidCredentialsError } from './errors';

const typeDefs = importSchema('./http/src/schema/schema.graphql');
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('You did not provide a JWT_SECRET env variable');
}

export type Context = KoaContext & {
  db: Prisma;
};

type SessionData = {
  userId: string;
  iat: number;
};

const resolvers: IResolvers<{}, Context> = {
  Query: {
    session: async (parent, args, context, info) => {
      const token = getTokenFromAuthorization(
        context.req.headers.authorization,
      );

      if (!token) {
        return null;
      }

      try {
        const { userId } = jwt.verify(token, JWT_SECRET) as SessionData;

        return context.db.query.user({ where: { id: userId } }, info);
      } catch (err) {
        return null;
      }
    },
    user: (parent, args, context, info) => {
      return context.db.query.user({ where: args.where }, info);
    },
    users: (parent, args, context, info) => {
      return context.db.query.users({}, info);
    },
    documents: (parent, args, context, info) => {
      return context.db.query.documents({}, info);
    },
  },
  Mutation: {
    createUser: async (parent, { input }, context, info) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(input.password, salt);

      return context.db.mutation.createUser(
        {
          data: {
            email: input.email,
            password: hashedPassword,
            role: input.role,
            profile: input.profile,
          },
        },
        info,
      );
    },
    updateUser: async (parent, { data, where }, context, info) => {
      return context.db.mutation.updateUser(
        {
          data,
          where,
        },
        info,
      );
    },
    deleteUser: async (parent, { where }, context, info) => {
      return context.db.mutation.deleteUser({ where });
    },
    authenticate: async (
      parent,
      { input: { email, password } },
      context,
      info,
    ) => {
      const user = await context.db.query.user({
        where: { email },
      });

      if (!user) {
        throw new InvalidCredentialsError();
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new InvalidCredentialsError();
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      await context.db.mutation.updateUser({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      return { token };
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
