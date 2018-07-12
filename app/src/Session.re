module SessionQuery = {
  type result('a) =
    | Requesting
    | Authorized('a)
    | Unauthorized;

  module GetSession = [%graphql
    {|
    query getSession {
      session {
        id
        email
      }
    }
  |}
  ];

  module GetSessionQuery = ReasonApollo.CreateQuery(GetSession);

  let component = ReasonReact.statelessComponent("SessionQuery");

  let make = children => {
    ...component,
    render: _self =>
      <GetSessionQuery>
        ...(
             ({result}) =>
               switch (result) {
               | Loading => children(Requesting)
               | Error(_error) => children(Unauthorized)
               | Data(data) =>
                 switch (data##session) {
                 | Some(session) => children(Authorized(session))
                 | None => children(Unauthorized)
                 }
               }
           )
      </GetSessionQuery>,
  };
};

module LoginMutation = {
  module Authenticate = [%graphql
    {|
  mutation authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      token
    }
  }
|}
  ];

  module AuthenticateMutation = ReasonApollo.CreateMutation(Authenticate);
  let component = ReasonReact.statelessComponent("SessionProvider");

  let make = children => {
    ...component,
    render: _self =>
      <AuthenticateMutation>
        ...(
             (mutation, _) => {
               let login = (~email, ~password) => {
                 let login =
                   Authenticate.make(
                     ~input={"email": email, "password": password},
                     (),
                   );

                 mutation(~variables=login##variables, ()) |> ignore;
               };
               children(login);
             }
           )
      </AuthenticateMutation>,
  };
};

let component = ReasonReact.statelessComponent("SessionProvider");

let make = children => {
  ...component,
  render: _self =>
    <LoginMutation>
      ...(
           login =>
             <SessionQuery>
               ...(session => children(login, session))
             </SessionQuery>
         )
    </LoginMutation>,
};