import bcrypt from 'bcryptjs';
import Cookies from 'cookies';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { Prisma } from 'prisma-binding';

const typeDefs = importSchema('./src/schema/schema.graphql');

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
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
