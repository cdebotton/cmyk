let component = ReasonReact.statelessComponent("Redirect");

let make = (~href, _children) => {
  ...component,
  didMount: _self => ReasonReact.Router.push(href),
  render: _self => ReasonReact.null,
};