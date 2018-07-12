type route = ReasonReact.Router.url;
type state = {route};
type action =
  | ChangeRoute(route);

let initialRoute = ReasonReact.Router.dangerouslyGetInitialUrl();

module RouterContext =
  Context.Make({
    type t = state;
    let value = {route: initialRoute};
  });

module Provider = {
  let component = ReasonReact.reducerComponent("RouterProvider");
  let make = children => {
    ...component,
    initialState: () => {route: initialRoute},
    reducer: (action, _state) =>
      switch (action) {
      | ChangeRoute(route) => ReasonReact.Update({route: route})
      },
    subscriptions: ({send}) => [
      ReasonReact.Sub(
        () => ReasonReact.Router.watchUrl(url => send(ChangeRoute(url))),
        ReasonReact.Router.unwatchUrl,
      ),
    ],
    render: ({state}) =>
      <RouterContext.Provider value=state>
        ...children
      </RouterContext.Provider>,
  };
};

module Switch = {
  let component = ReasonReact.statelessComponent("RouterSwitch");

  let make = (~mapUrlToRoute, children) => {
    ...component,
    render: _self =>
      <RouterContext.Consumer>
        ...(({route}) => children(route.path |> mapUrlToRoute))
      </RouterContext.Consumer>,
  };
};