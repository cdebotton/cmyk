type values = {
  login: string,
  password: string,
};

type errors = {
  email: option(array(string)),
  password: option(array(string)),
};

type touched = {
  email: bool,
  password: bool,
};

type dirty = {
  email: bool,
  password: bool,
};

type state = {
  values,
  errors,
  touched,
};

type action =
  | UpdateEmail(string)
  | UpdatePassword(string);

let component = ReasonReact.reducerComponent("Login");

let make = _children => {
  ...component,
  initialState: () => {
    values: {
      login: "",
      password: "",
    },
    errors: {
      email: None,
      password: None,
    },
    touched: {
      email: false,
      password: false,
    },
  },
  reducer: (action, state) =>
    switch (action) {
    | UpdateEmail(login) =>
      ReasonReact.Update({
        ...state,
        values: {
          ...state.values,
          login,
        },
      })
    | UpdatePassword(password) =>
      ReasonReact.Update({
        ...state,
        values: {
          ...state.values,
          password,
        },
      })
    },
  render: ({state: {values, errors}, send}) => {
    let onSubmit = event => {
      ReactEventRe.Form.preventDefault(event);
      Js.log(values);
    };

    let updateEmail = event => {
      let target =
        event |> ReactEventRe.Form.target |> ReactDOMRe.domElementToObj;
      send(UpdateEmail(target##value));
    };
    let updatePassword = event => {
      let target =
        event |> ReactEventRe.Form.target |> ReactDOMRe.domElementToObj;
      send(UpdatePassword(target##value));
    };

    <div>
      <h1> ("Login" |> ReasonReact.string) </h1>
      <form onSubmit>
        <input
          type_="email"
          placeholder="Email"
          value=values.login
          onChange=updateEmail
        />
        (
          switch (errors.email) {
          | None => ReasonReact.null
          | Some(errors) =>
            <Fragment>
              ...(
                   errors
                   |> Array.mapi((i, error) =>
                        <span key={j|ERROR_$i|j}>
                          (error |> ReasonReact.string)
                        </span>
                      )
                 )
            </Fragment>
          }
        )
        <input
          type_="password"
          placeholder="Password"
          value=values.password
          onChange=updatePassword
        />
        <button type_="submit"> ("Login" |> ReasonReact.string) </button>
      </form>
    </div>;
  },
};