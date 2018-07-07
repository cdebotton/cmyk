import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { Prisma } from 'prisma-binding';

const { PRISMA_SECRET, NODE_ENV = 'development' } = process.env;

const server = new ApolloServer({
  schema,
  context: () => {
    db: new Prisma({
      typeDefs: 'api/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
      debug: NODE_ENV === 'development',
      secret: PRISMA_SECRET,
    });
  },
});

const run = async () => {
  const { address, port } = await server.listen(3001);
  process.stdout.write(`API running at ${address}${port}`);
};

run();
