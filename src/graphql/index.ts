import { ApolloServer, GraphQLUpload, makeExecutableSchema } from 'apollo-server';
import { Context } from 'apollo-server-core';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';
import { Prisma, prisma } from './generated/prisma-client';
import Document from './resolvers/Document';
import File from './resolvers/File';
import Mutation from './resolvers/Mutation';
import Profile from './resolvers/Profile';
import Query from './resolvers/Query';
import Session from './resolvers/Session';
import User from './resolvers/User';

const { PORT, ENGINE_API_NAME, ENGINE_API_KEY } = process.env;

const typeDefs = importSchema('src/graphql/schema.graphql');

const schema = makeExecutableSchema({
  // @ts-ignore
  resolvers: {
    Document,
    File,
    Mutation,
    Profile,
    Query,
    Session,
    User,
    Upload: GraphQLUpload,
  },
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

  const user = await db.user({ id: t.userId });

  return {
    user,
    iat: t.iat,
  };
}

const server = new ApolloServer({
  schema,
  context: (ctx: Context) => {
    const session = getSession(prisma, ctx.req.headers.authorization);

    return {
      ...ctx,
      db: prisma,
      session,
    };
  },
  engine: {
    apiKey: `service:${ENGINE_API_NAME}:${ENGINE_API_KEY}`,
  },
  uploads: true,
});

server.listen(PORT).then(info => {
  process.stdout.write(`Listening at ${info.url}`);
});
