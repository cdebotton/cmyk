import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { Prisma } from 'prisma-binding';

const server = new ApolloServer({
  schema,
  context: (ctx: any) => ({
    ...ctx,
    db: new Prisma({
      typeDefs: 'api/generated/prisma.graphql',
      debug: process.env.NODE_ENV === 'development',
      endpoint: 'http://localhost:4466',
      secret: process.env.PRISMA_SECRET,
    }),
  }),
});

server.listen(3001);
