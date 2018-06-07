require('dotenv').config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Context as KoaContext } from 'koa';
import { importSchema } from 'graphql-import';
import {
  makeExecutableSchema,
  IResolvers,
  SchemaDirectiveVisitor,
} from 'graphql-tools';
import { Prisma } from 'prisma-binding';
import getTokenFromAuthorization from './libs/getTokenFromHeader';
import { GraphQLField, GraphQLEnumValue } from 'graphql';
import { InvalidCredentialsError } from './errors';

const typeDefs = importSchema('./src/http/schema/schema.graphql');
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('You did not provide a JWT_SECRET env variable');
}

export type Context = KoaContext & {
  db: Prisma;
};

const resolvers: IResolvers<{}, Context> = {
  Query: {
    session: (parent, args, context, info) => {
      const token = getTokenFromAuthorization(
        context.req.headers.authorization,
      );

      if (!token) {
        return null;
      }

      try {
        return jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return null;
      }
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
          },
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

      return { token };
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
