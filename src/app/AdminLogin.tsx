import React, { SFC } from 'react';
import Heading from './components/atoms/Heading';
import { Mutation, FetchResult } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

const authenticateMutation = gql`
  mutation Authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      userId
      iat
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

type AuthResponse = {
  authenticate: { userId: string; iat: number } | null;
};

const AdminLogin: SFC = () => (
  <div>
    <Heading>Login</Heading>
    <Mutation mutation={authenticateMutation}>
      {authenticate => (
        <Formik
          validationSchema={validationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={input => {
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

export default AdminLogin;
