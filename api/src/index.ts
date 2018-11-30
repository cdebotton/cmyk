import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { db } from './db';
import { Context } from './context';
import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';
import { User } from './resolvers/User';
import { Profile } from './resolvers/Profile';
import { File } from './resolvers/File';
import { getToken } from './utils';

const { PORT = 3002, ENGINE_API_NAME, ENGINE_API_KEY } = process.env;

const typeDefs = importSchema('src/schema.graphql');

const schema = makeExecutableSchema({
  resolvers: {
    Query,
    Mutation,
    User,
    Profile,
    File,
  },
  typeDefs,
});

const server = new ApolloServer({
  schema,
  context: (ctx: any) => {
    const token = getToken(ctx.req.headers.authorization);

    return new Context(token, db);
  },
  engine: {
    apiKey: `service:${ENGINE_API_NAME}:${ENGINE_API_KEY}`,
  },
  uploads: true,
});

server.listen(PORT).then(info => {
  process.stdout.write(`Listening at ${info.url}`);
});
