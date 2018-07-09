let inMemoryCache = ApolloInMemoryCache.createInMemoryCache();
let httpLink = ApolloLinks.createHttpLink(~uri="http://localhost:3001", ());
let instance =
  ReasonApollo.createApolloClient(
    ~link=httpLink,
    ~cache=inMemoryCache,
    ~connectToDevTools=true,
    (),
  );