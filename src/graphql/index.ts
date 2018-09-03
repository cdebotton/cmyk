import { ApolloServer, IResolvers, makeExecutableSchema } from 'apollo-server';
import { importSchema } from 'graphql-import';

const { PORT } = process.env;

const typeDefs = importSchema('src/graphql/schema/typeDefs.graphql');
const resolvers: IResolvers<{}, {}> = {
  Query: {
    users: () => [{ id: 1 }],
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

server.listen(PORT);
