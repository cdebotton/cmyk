type route = ReasonReact.Router.url;
type state = {route};
type action =
  | ChangeRoute(route);

let initialState = () => {
  route: ReasonReact.Router.dangerouslyGetInitialUrl(),
};

let reducer = (action, _state) =>
  switch (action) {
  | ChangeRoute(route) => ReasonReact.Update({route: route})
  };

let subscriptions = ({ReasonReact.send}) => [
  ReasonReact.(
    Sub(
      () => Router.watchUrl(route => send(ChangeRoute(route))),
      Router.unwatchUrl,
    )
  ),
];

module ContextConfig = {
  type t = state;
  let debugName = "RouterContext";
  let value = initialState();
};

module RouterContext = Context.CreateContext(ContextConfig);

let component = ReasonReact.reducerComponent("Router");

let make = children => {
  ...component,
  initialState,
  reducer,
  subscriptions,
  render: ({state}) =>
    <RouterContext.Provider value=state> children </RouterContext.Provider>,
};