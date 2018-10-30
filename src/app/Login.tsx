import { Field, FieldProps, Formik } from 'formik';
import gql from 'graphql-tag';
import { padding, rem } from 'polished';
import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as yup from 'yup';
import { Login as LoginMutation, LoginVariables } from './__generated__/Login';
import { Session } from './__generated__/Session';
import Button from './components/Button';
import Heading from './components/Heading';
import Input from './components/Input';
import {
  useApolloClient,
  useApolloMutation,
  useApolloQuery,
} from './hooks/apollo';
import GlobalStyles from './styles/AdminStyles';
import background from './styles/background';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
});

const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data)
  }
`;

const SESSION_QUERY = gql`
  query Session {
    session {
      iat
    }
  }
`;

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

interface Values {
  email: string;
  password: string;
}

function Login({ className, location }: Props) {
  const client = useApolloClient();

  if (!client) {
    throw new Error(
      "Can't find Apollo client, please wrap application in <ApolloProvider />",
    );
  }

  const {
    data: { session },
  } = useApolloQuery<Session>(SESSION_QUERY);

  const mutate = useApolloMutation<LoginMutation, LoginVariables>(
    LOGIN_MUTATION,
  );

  if (session) {
    const to =
      location.state && location.state.attempt
        ? location.state.attempt
        : '/admin';

    return <Redirect to={to} />;
  }

  return (
    <LoginContainer className={className}>
      <GlobalStyles />

      <Formik<Values>
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => {
          mutate({
            update: (proxy, { data: result }) => {
              if (result && result.login) {
                localStorage.setItem('jwt', result.login);
                client.resetStore();
              }
            },
            variables: {
              data: values,
            },
          });
        }}
      >
        {({ handleSubmit, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <LoginHeading level={1}>Login</LoginHeading>
            <Field
              name="email"
              render={({ field, form }: FieldProps<Values>) => (
                <EmailInput form={form} field={field} label="Email" />
              )}
            />
            <Field
              name="password"
              render={({ field, form }: FieldProps<Values>) => (
                <PasswordInput
                  field={field}
                  form={form}
                  type="password"
                  label="Password"
                />
              )}
            />
            <LoginButton type="submit" disabled={!isValid}>
              Go
            </LoginButton>
          </Form>
        )}
      </Formik>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: max-content;
  align-content: center;
  justify-content: center;
  background-color: #fff;
  ${background};
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${rem(16)};
  border-radius: 3px;
  ${padding(rem(16))};
`;

const LoginHeading = styled(Heading)`
  grid-column: 1 / span 2;
`;

const EmailInput = styled(Input)``;

const PasswordInput = styled(Input)``;

const LoginButton = styled(Button)`
  grid-column: 2 / span 1;
`;

export default Login;
