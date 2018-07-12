let inMemoryCache = ApolloInMemoryCache.createInMemoryCache();
let httpLink = ApolloLinks.createHttpLink(~uri="http://localhost:3001", ());

let contextHandler = () => {
  let maybeToken = Effects.getTokenValueFromStorage();
  {
    "headers": {
      "Authorization":
        switch (maybeToken) {
        | None => ""
        | Some(token) => {j|Bearer $token|j}
        },
    },
  };
};

let authLink = ApolloLinks.createContextLink(contextHandler);

let instance =
  ReasonApollo.createApolloClient(
    ~link=ApolloLinks.from([|authLink, httpLink|]),
    ~cache=inMemoryCache,
    ~connectToDevTools=true,
    (),
  );