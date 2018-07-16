module LoginQuery = [%graphql
  {|
  mutation Login($input: AuthenticateInput!) {
    authenticate(input: $input) {
      token
    }
  }
|}
];

module LoginMutation = ReasonApollo.CreateMutation(LoginQuery);

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
  ...component,
  render: _self =>
    <LoginMutation>
      ...(
           (mutation, _renderPropObj) =>
             <LoginForm
               initialValues={email: "", password: ""}
               onSubmit=(
                 (~onSubmitSuccess, ~onSubmitFailure, {email, password}) => {
                   let login =
                     LoginQuery.make(
                       ~input={"email": email, "password": password},
                       (),
                     );

                   Js.Promise.(
                     mutation(~variables=login##variables, ())
                     |> then_(_data => onSubmitSuccess() |> resolve)
                     |> catch(err =>
                          err
                          |> Js.String.make
                          |> (err => err |> onSubmitFailure)
                          |> resolve
                        )
                     |> ignore
                   );
                 }
               )>
               ...(
                    (~valueOf, ~onChange, ~onSubmit, ~submitting) =>
                      <form onSubmit>
                        <input
                          value=(
                            switch (valueOf(Email)) {
                            | Text(value) => value
                            }
                          )
                          onChange=(
                            event =>
                              LoginConfig.Text(
                                event |> Form.getValueFromEvent,
                              )
                              |> onChange(Email)
                          )
                        />
                        <input
                          type_="password"
                          value=(
                            switch (valueOf(Password)) {
                            | Text(value) => value
                            }
                          )
                          onChange=(
                            event =>
                              LoginConfig.Text(
                                event |> Form.getValueFromEvent,
                              )
                              |> onChange(Password)
                          )
                        />
                        <button type_="submit" disabled=submitting>
                          ("Login" |> ReasonReact.string)
                        </button>
                      </form>
                  )
             </LoginForm>
         )
    </LoginMutation>,
};