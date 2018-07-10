module Styles = {
  open Css;

  let containerPadding = padding(0.5 |. rem);

  let main =
    style([
      width(100. |. vw),
      minHeight(100. |. vh),
      display(grid),
      `declaration(("gridTemplateColumns", "min-content auto")),
      `declaration(("gridTemplateRows", "auto auto")),
    ]);

  let nav =
    style([
      containerPadding,
      display(grid),
      `declaration(("alignContent", "start")),
      `declaration(("gridColumn", "1 / span 1")),
      `declaration(("gridRow", "1 / span 2")),
    ]);

  let content =
    style([
      containerPadding,
      `declaration(("gridColumn", "2 / span 1")),
      `declaration(("gridRow", "1 / span 2")),
    ]);
};

type route =
  | Dashboard
  | Documents
  | Users
  | User(int)
  | Settings
  | NotFound;

let mapUrlToRoute =
  fun
  | [_] => Dashboard
  | [_, "documents"] => Documents
  | [_, "users"] => Users
  | [_, "users", id] => User(int_of_string(id))
  | [_, "settings"] => Settings
  | _ => NotFound;

module LazyDashboardConfig = {
  module type t = (module type of Dashboard);
};

module LazyDashboard = Loadable.Make(LazyDashboardConfig);

module LazyDocumentsConfig = {
  module type t = (module type of Documents);
};

module LazyDocuments = Loadable.Make(LazyDocumentsConfig);

module LazyUsersConfig = {
  module type t = (module type of Users);
};

module LazyUsers = Loadable.Make(LazyUsersConfig);

module LazySettingsConfig = {
  module type t = (module type of Settings);
};

module LazySettings = Loadable.Make(LazySettingsConfig);

let component = ReasonReact.statelessComponent("Admin");
let make = _children => {
  ...component,
  render: _self =>
    <div className=Styles.main>
      <nav className=Styles.nav>
        <Link href="/admin"> ("Admin" |> ReasonReact.string) </Link>
        <Link href="/admin/documents">
          ("Documents" |> ReasonReact.string)
        </Link>
        <Link href="/admin/users"> ("Users" |> ReasonReact.string) </Link>
        <Link href="/admin/settings">
          ("Settings" |> ReasonReact.string)
        </Link>
      </nav>
      <div className=Styles.content>
        <Router.Switch mapUrlToRoute>
          ...(
               route =>
                 switch (route) {
                 | Dashboard =>
                   <LazyDashboard
                     loader=(() => DynamicImport.import("./Dashboard"))
                     render=(((module Dashboard)) => <Dashboard />)
                   />
                 | Documents =>
                   <LazyDocuments
                     loader=(() => DynamicImport.import("./Documents"))
                     render=(((module Documents)) => <Documents />)
                   />
                 | Users =>
                   <LazyUsers
                     loader=(() => DynamicImport.import("./Users"))
                     render=(((module Users)) => <Users />)
                   />
                 | User(_id) => ReasonReact.null
                 | Settings =>
                   <LazySettings
                     loader=(() => DynamicImport.import("./Settings"))
                     render=(((module Settings)) => <Settings />)
                   />
                 | NotFound => <p> ("Not found" |> ReasonReact.string) </p>
                 }
             )
        </Router.Switch>
      </div>
    </div>,
};