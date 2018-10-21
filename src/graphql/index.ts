import {
  ApolloServer,
  GraphQLUpload,
  makeExecutableSchema,
} from 'apollo-server';
import { Context } from 'apollo-server-core';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';
import { Prisma } from 'prisma-binding';
import { IResolvers } from './__generated__/resolvers';
import Document from './resolvers/Document';
import DocumentType from './resolvers/DocumentType';
import File from './resolvers/File';
import Mutation from './resolvers/Mutation';
import Profile from './resolvers/Profile';
import Query from './resolvers/Query';
import Session from './resolvers/Session';
import { TypeMap } from './resolvers/TypeMap';
import User from './resolvers/User';

const { PORT } = process.env;

interface Resolvers extends IResolvers<TypeMap> {
  Upload: typeof GraphQLUpload;
}

const typeDefs = importSchema('src/graphql/schema/typeDefs.graphql');
const resolvers: Resolvers = {
  Document,
  DocumentType,
  File,
  Mutation,
  Profile,
  Query,
  Session,
  User,
  Upload: GraphQLUpload,
};

const schema = makeExecutableSchema<TypeMap['Context']>({
  // @ts-ignore
  resolvers,
  typeDefs,
});

interface IToken {
  iat: string;
  userId: string;
}

async function getSession(db: Prisma, authorization?: string) {
  if (!authorization) {
    return null;
  }

  const token = authorization.split(' ')[1];
  let decoded = jwt.verify(token, 'shh');

  if (!decoded) {
    return null;
  }

  if (typeof decoded === 'string') {
    decoded = JSON.parse(decoded);
  }

  const t = decoded as IToken;

  const user = await db.query.user({ where: { id: t.userId } });

  return {
    user,
    iat: t.iat,
  };
}

const server = new ApolloServer({
  schema,
  context: (ctx: Context) => {
    const db = new Prisma({
      endpoint: 'http://localhost:4466',
      typeDefs: 'src/graphql/schema/prisma.graphql',
    });

    const session = getSession(db, ctx.req.headers.authorization);

    return {
      ...ctx,
      db,
      session,
    };
  },
  uploads: true,
});

server.listen(PORT);
