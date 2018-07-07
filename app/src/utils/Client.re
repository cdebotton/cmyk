let cache = ApolloInMemoryCache.createInMemoryCache();
let link =
  ApolloLinks.createHttpLink(~uri="https://localhost:3000/graphql", ());
let instance =
  ReasonApollo.createApolloClient(~link, ~cache, ~connectToDevTools=true, ());