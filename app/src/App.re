let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self =>
    <Fragment>
      <nav>
        <Link href="/"> ("Public pages" |> ReasonReact.string) </Link>
        <Link href="/admin"> ("Admin pages" |> ReasonReact.string) </Link>
      </nav>
      <Router.Consumer>
        ...(
             ({route}) =>
               switch (route.path) {
               | ["admin", ..._] => <Admin />
               | _ => <Public />
               }
           )
      </Router.Consumer>
    </Fragment>,
};