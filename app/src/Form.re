module type Config = {
  type field;
  type state;
  type value;
  type message;

  let get: (field, state) => value;
  let set: ((field, value), state) => state;
  let valueEmpty: value => bool;
};

module Make = (Form: Config) => {
  module FieldsSetOrigin =
    Set.Make({
      type t = Form.field;
      let compare = Pervasives.compare;
    });

  type action =
    | Change((Form.field, Form.value))
    | Blur((Form.field, Form.value))
    | Submit
    | SetSubmittedStatus(option(Form.state))
    | SetSubmissionFailedStatus(
        list((Form.field, Form.message)),
        option(Form.message),
      )
    | DismissSubmissionResult
    | Reset;
};