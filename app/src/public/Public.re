let component = ReasonReact.statelessComponent("Public");
let make = _children => {
  ...component,
  render: _self => <div> ("Public" |> ReasonReact.string) </div>,
};