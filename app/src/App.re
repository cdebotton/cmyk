let component = ReasonReact.statelessComponent("App");

let make = _children => {
  let str = ReasonReact.string;
  {...component, render: _self => <div> ("Hello, world!" |> str) </div>};
};