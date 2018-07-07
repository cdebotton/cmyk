let cache = ApolloInMemoryCache.createInMemoryCache();
let link = ApolloLinks.createHttpLink(~uri="http://localhost:3001", ());
let instance =
  ReasonApollo.createApolloClient(~link, ~cache, ~connectToDevTools=true, ());