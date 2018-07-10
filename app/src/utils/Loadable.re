open DynamicImport;

module type Configuration = {module type t;};

module Make = (C: Configuration) => {
  type state =
    | Loading
    | Error(string)
    | Loaded((module C.t));

  type action =
    | Load
    | Failure(string)
    | Done((module C.t));

  let component = ReasonReact.reducerComponent("Loadable");

  type loadingProp = unit => ReasonReact.reactElement;
  type errorProp = string => ReasonReact.reactElement;
  type renderProp = (module C.t) => ReasonReact.reactElement;

  let make =
      (
        ~loader,
        ~delay=0,
        ~loading: loadingProp=() => ReasonReact.null,
        ~error: errorProp=_ => ReasonReact.null,
        ~render: renderProp=_ => ReasonReact.null,
        _children,
      ) => {
    ...component,
    initialState: () => Loading,
    reducer: (action, _state) =>
      switch (action) {
      | Load =>
        ReasonReact.UpdateWithSideEffects(
          Loading,
          (
            ({send}) =>
              loader()
              |> resolve
              <$> (data => send(Done(data)))
              <$!> (err => send(Failure(err |> Js.String.make)))
              |> ignore
          ),
        )
      | Failure(err) => ReasonReact.Update(Error(err))
      | Done(data) => ReasonReact.Update(Loaded(data))
      },
    subscriptions: ({send}) => [
      Sub(
        () => Js.Global.setTimeout(() => send(Load), delay),
        Js.Global.clearTimeout,
      ),
    ],
    render: ({state}) =>
      switch (state) {
      | Loading => loading()
      | Error(err) => error(err)
      | Loaded(component) => render(component)
      },
  };
};