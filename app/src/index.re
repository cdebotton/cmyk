Css.(
  global(
    "body",
    [margin(0. |. rem), padding(0. |. rem), fontFamily("sans-serif")],
  ),
  global("*, *::before, *::after", [boxSizing(borderBox)]),
);

ReactDOMRe.renderToElementWithId(
  <ApolloProvider client=Client.instance>
    <Router.Provider> <App /> </Router.Provider>
  </ApolloProvider>,
  "app",
);