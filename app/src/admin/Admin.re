module GetSession = [%graphql
  {|
  query getSession {
    session {
      id
    }
  }
|}
];

module GetSessionQuery = ReasonApollo.CreateQuery(GetSession);

let component = ReasonReact.statelessComponent("Admin");
let make = _children => {
  ...component,
  render: _self =>
    <GetSessionQuery>
      ...(
           ({result}) =>
             switch (result) {
             | Loading => <div> ("Loading..." |> ReasonReact.string) </div>
             | Error(error) =>
               <div> (error##message |> ReasonReact.string) </div>
             | Data(_response) => ReasonReact.null
             }
         )
    </GetSessionQuery>,
};