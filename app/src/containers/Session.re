type user = {
  id: string,
  email: string,
};

type credentials = {
  email: string,
  password: string,
};

type state =
  | Unauthorized
  | Authorized(user);

type action =
  | Logout(user)
  | Login(credentials);

module SessionContext =
  Context.Make({
    type t = state;
    let value = Unauthorized;
  });

module GetSession = [%graphql
  {|
  query getSession {
    session {
      id
    }
  }
|}
];

module SessionQuery = ReasonApollo.CreateQuery(GetSession);