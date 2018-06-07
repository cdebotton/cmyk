import React, { SFC } from 'react';
import Heading from './components/atoms/Heading';
import { Mutation, MutationUpdaterFn } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import SessionContext from './containers/SessionContext';
import { Redirect, RouteComponentProps } from 'react-router';
import { authenticate } from './lib/Auth';

const authenticateMutation = gql`
  mutation Authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      token
    }
  }
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
});

type Props = RouteComponentProps<{}>;

const AdminLogin: SFC<Props> = ({ location }) => (
  <SessionContext.Consumer>
    {({ session, resetStore }) => {
      if (session) {
        const redirectTo =
          location.state && location.state.redirectedFrom
            ? location.state.redirectedFrom
            : '/admin';

        return <Redirect to={redirectTo} />;
      }

      return (
        <div>
          <Heading>Login</Heading>
          <Mutation
            mutation={authenticateMutation}
            update={updateAuthentication(resetStore)}
          >
            {authenticate => (
              <Formik
                validationSchema={validationSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={async input => {
                  authenticate({ variables: { input } });
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Field component="input" type="email" name="email" />
                    <Field component="input" type="password" name="password" />
                    <button type="submit">Login</button>
                  </form>
                )}
              </Formik>
            )}
          </Mutation>
        </div>
      );
    }}
  </SessionContext.Consumer>
);

type AuthenticateResponse = {
  authenticate: {
    token: string | null;
  };
};

const updateAuthentication = (
  onUpdate: () => Promise<any>,
): MutationUpdaterFn<AuthenticateResponse> => (operation, result) => {
  if (!result.data || !result.data.authenticate.token) {
    return;
  }

  authenticate(result.data.authenticate.token);
  onUpdate();
};

export default AdminLogin;
