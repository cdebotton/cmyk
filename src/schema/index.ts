import bcrypt from 'bcryptjs';
import Cookies from 'cookies';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import getFieldsFromInfo from './utils/getFieldsFromInfo';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import bindTypeORMQuery from './utils/bindTypeORMQuery';

const typeDefs = `
  scalar Date

  type User {
    id: ID!
    email: String! @unique
    password: String!
    documents: [Document!]!
    createdAt: Date
    updatedAt: Date
  }

  type Document {
    id: ID!
    title: String!
    user: User!
  }

  input CreateUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }

  type Query {
    users(skip: Int, take: Int): [User]
  }
`;

type Context = {
  cookies: Cookies;
  userRepository: Repository<User>;
};

const resolvers: IResolvers<void, Context> = {
  Query: {
    users: (root, args, context, info) => {
      const payload = getFieldsFromInfo<User>(info);
      const metadata = bindTypeORMQuery(context.userRepository, payload);

      return context.userRepository
        .createQueryBuilder()
        .skip(args.skip)
        .take(args.take)
        .select(metadata.select)
        .execute();
    },
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      const { email, password } = args.input;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const payload = getFieldsFromInfo<User>(info);
      const metadata = bindTypeORMQuery(context.userRepository, payload);

      return context.userRepository
        .createQueryBuilder()
        .insert()
        .values({ email, password: hashedPassword })
        .returning(metadata.select.map(f => `inserted.${f}`))
        .execute();
    },
  },
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export default schema;
