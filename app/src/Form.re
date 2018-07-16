let getValueFromEvent = event => {
  let target = event |> ReactEventRe.Form.target |> ReactDOMRe.domElementToObj;
  target##value;
};

let getCheckedFromEvent = event => {
  let target = event |> ReactEventRe.Form.target |> ReactDOMRe.domElementToObj;
  target##checked;
};

module type Config = {
  type state;
  type value;
  type field;

  let debugName: string;
  let get: (field, state) => value;
  let set: ((field, value), state) => state;
};

module Make = (C: Config) => {
  type state = {
    data: C.state,
    submitting: bool,
  };
  type action =
    | Change((C.field, C.value))
    | Submit
    | SubmitSuccess
    | SubmitFailure(string);
  type interface('a) =
    (
      ~valueOf: C.field => C.value,
      ~onChange: (C.field, C.value) => unit,
      ~onSubmit: (
                   ~onSubmitSuccess: unit => unit,
                   ~onSubmitFailure: string => unit,
                   ReactEventRe.Form.t
                 ) =>
                 Js.Promise.t('a),
      ~submitting: bool
    ) =>
    ReasonReact.reactElement;

  let getInitialState = data => {data, submitting: false};

  let component = ReasonReact.reducerComponent(C.debugName);
  let make = (~initialValues, ~onSubmit as onSubmitHandler, children) => {
    ...component,
    initialState: () => getInitialState(initialValues),
    reducer: (action, state) =>
      switch (action) {
      | Change((field, value)) =>
        let data = state.data |> C.set((field, value));
        ReasonReact.Update({...state, data});
      | Submit => ReasonReact.Update({...state, submitting: true})
      | SubmitFailure(_err) =>
        ReasonReact.Update({...state, submitting: false})
      | SubmitSuccess => ReasonReact.Update({...state, submitting: false})
      },
    render: ({state, send}) => {
      let {submitting, data} = state;
      let valueOf = field => data |> C.get(field);
      let onChange = (field, value) => Change((field, value)) |> send;
      let onSubmitSuccess = () => SubmitSuccess |> send;
      let onSubmitFailure = err => SubmitFailure(err) |> send;
      let onSubmit = event => {
        event |> ReactEventRe.Form.preventDefault;
        data
        |> onSubmitHandler(~onSubmitSuccess, ~onSubmitFailure)
        |> (_req => Submit)
        |> send;
      };
      children(~valueOf, ~onChange, ~onSubmit, ~submitting);
    },
  };
};