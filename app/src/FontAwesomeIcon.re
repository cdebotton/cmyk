[@bs.module "@fortawesome/react-fontawesome"]
external reactClass : ReasonReact.reactClass = "FontAwesomeIcon";

[@bs.deriving abstract]
type jsProps = {
  icon: string,
  className: Js.Nullable.t(string),
};

let make =
  ReasonReact.wrapJsForReason(~reactClass, ~props=jsProps(~icon=""), [||]);