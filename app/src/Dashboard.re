let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self => <div> ("Dashboard" |> ReasonReact.string) </div>,
};