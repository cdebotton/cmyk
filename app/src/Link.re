module Styles = {
  let main = Css.(style([textDecoration(none)]));
};

let component = ReasonReact.statelessComponent("Link");
let make = (~href, ~className=None, children) => {
  let onClick = event => {
    ReactEventRe.Mouse.preventDefault(event);
    let target = ReactEventRe.Mouse.target(event);
    let value = ReactDOMRe.domElementToObj(target)##href;
    ReasonReact.Router.push(value);
  };

  let className = Styles.main |> Styled.concat(className);

  {
    ...component,
    render: _self =>
      <a className href onClick> (children |> ReasonReact.array) </a>,
  };
};