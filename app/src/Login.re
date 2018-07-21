module Login = [%graphql
  {|
  mutation Login($input: AuthenticateInput!) {
    authenticate(input: $input) {
      token
    }
  }
|}
];

module LoginMutation = ReasonApollo.CreateMutation(Login);

module LoginConfig = {
  type state = {
    email: string,
    password: string,
  };
  type field =
    | Email
    | Password;
  type value =
    | Text(string);

  let debugName = "LoginForm";
  let get = (field, state) =>
    switch (field) {
    | Email => Text(state.email)
    | Password => Text(state.password)
    };

  let set = ((field, value), state) =>
    switch (field, value) {
    | (Email, Text(email)) => {...state, email}
    | (Password, Text(password)) => {...state, password}
    };
};

module LoginForm = Form.Make(LoginConfig);

let component = ReasonReact.statelessComponent("Login");

let make = _children => {
  let onSubmit =
      (
        mutation: LoginMutation.apolloMutation,
        _renderPropObj,
        ~onSubmitSuccess,
        ~onSubmitFailure,
        {email, password}: LoginConfig.state,
      ) => {
    let login =
      Login.make(~input={"email": email, "password": password}, ());

    Js.Promise.(
      mutation(~variables=login##variables, ())
      |> then_(_data => onSubmitSuccess |> ignore |> resolve)
      |> catch(err =>
           err |> Js.String.make |> (err => err |> onSubmitFailure) |> resolve
         )
      |> ignore
    );
  };

  let initialValues = LoginConfig.{email: "", password: ""};

  let unwrapText = value =>
    switch (value) {
    | LoginConfig.Text(text) => text
    };

  let renderLoginForm = (mutation, renderPropObj) =>
    <LoginForm initialValues onSubmit=(onSubmit(mutation, renderPropObj))>
      ...(
           (~valueOf, ~onChange, ~onSubmit, ~submitting) =>
             <form onSubmit>
               <input
                 value=(valueOf(Email) |> unwrapText)
                 onChange=(
                   event =>
                     LoginConfig.Text(event |> Form.getValueFromEvent)
                     |> onChange(Email)
                 )
               />
               <input
                 type_="password"
                 value=(valueOf(Password) |> unwrapText)
                 onChange=(
                   event =>
                     LoginConfig.Text(event |> Form.getValueFromEvent)
                     |> onChange(Password)
                 )
               />
               <button type_="submit" disabled=submitting>
                 ("Login" |> ReasonReact.string)
               </button>
             </form>
         )
    </LoginForm>;

  {
    ...component,
    render: _self => <LoginMutation> ...renderLoginForm </LoginMutation>,
  };
};