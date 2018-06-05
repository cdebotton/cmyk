require('dotenv').config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { Prisma } from 'prisma-binding';

const typeDefs = importSchema('./src/schema/schema.graphql');
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('You did not provide a JWT_SECRET env variable');
}

type Context = {
  cookies: Cookies;
  db: Prisma;
};

const resolvers: IResolvers<{}, Context> = {
  Query: {
    users: (parent, args, context, info) => {
      return context.db.query.users({}, info);
    },
  },
  Mutation: {
    createUser: async (parent, { input }, context, info) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(input.password, salt);
      return context.db.mutation.createUser(
        { data: { email: input.email, password: hashedPassword } },
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
        throw new Error();
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error();
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      return {
        token,
      };
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
