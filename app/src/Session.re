module SessionQuery = {
  type result('a) =
    | Requesting
    | Authorized('a)
    | Unauthorized;

  module GetSession = [%graphql
    {|
    query Session {
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

let component = ReasonReact.statelessComponent("SessionProvider");

let make = children => {
  ...component,
  render: _self =>
    <SessionQuery> ...(session => children(session)) </SessionQuery>,
};