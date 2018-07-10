type route =
  | Admin
  | Public;

let mapUrlToRoute =
  fun
  | ["admin", ..._] => Admin
  | _ => Public;

module LazyAdminConfig = {
  module type t = (module type of Admin);
};

module LazyAdmin = Loadable.Make(LazyAdminConfig);

let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self =>
    <Router.Switch mapUrlToRoute>
      ...(
           route =>
             switch (route) {
             | Admin =>
               <LazyAdmin
                 loader=(() => DynamicImport.import("./Admin"))
                 loading=(() => <p> ("Loading" |> ReasonReact.string) </p>)
                 render=(((module Admin)) => <Admin />)
               />
             | Public => <Public />
             }
         )
    </Router.Switch>,
};