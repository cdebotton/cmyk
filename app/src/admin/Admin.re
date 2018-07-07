let component = ReasonReact.statelessComponent("Admin");
let make = _children => {
  ...component,
  render: _self => <div> ("Admin" |> ReasonReact.string) </div>,
};