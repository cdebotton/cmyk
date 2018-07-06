Css.(
  global(
    "html",
    [padding(0. |. rem), margin(0. |. rem), fontFamily("sans-serif")],
  )
);

ReactDOMRe.renderToElementWithId(
  <ApolloProvider client=Client.instance> <App /> </ApolloProvider>,
  "app",
);