module type Config = {type t; let value: t;};

module Make:
  (C: Config) =>
  {
    module Provider: {
      let make:
        (~value: C.t, 'a) =>
        ReasonReact.component(
          ReasonReact.stateless,
          ReasonReact.noRetainedProps,
          ReasonReact.actionless,
        );
    };

    module Consumer: {
      let make:
        (C.t => 'a) =>
        ReasonReact.component(
          ReasonReact.stateless,
          ReasonReact.noRetainedProps,
          ReasonReact.actionless,
        );
    };
  };