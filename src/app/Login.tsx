import { Field, FieldProps, Formik } from 'formik';
import gql from 'graphql-tag';
import { rem } from 'polished';
import React from 'react';
import { Mutation } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { Redirect, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as yup from 'yup';
import { Login as LoginMutation, LoginVariables } from './__generated__/Login';
import Button from './components/Button';
import Heading from './components/Heading';
import Input from './components/Input';
import Session from './containers/Session';

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

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

interface Values {
  email: string;
  password: string;
}

function Login({ className, location }: Props) {
  return (
    <Session>
      {({ session, client }) => {
        if (session) {
          const to =
            location.state && location.state.attempt
              ? location.state.attempt
              : '/admin';

          return <Redirect to={to} />;
        }

        return (
          <LoginContainer className={className}>
            <Mutation<LoginMutation, LoginVariables> mutation={LOGIN_MUTATION}>
              {mutate => (
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
                      <CancelButton type="submit">Cancel</CancelButton>
                    </Form>
                  )}
                </Formik>
              )}
            </Mutation>
          </LoginContainer>
        );
      }}
    </Session>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
`;

const Form = styled.form`
  display: grid;
  grid-gap: ${rem(10)};
`;

const LoginHeading = styled(Heading)``;

const EmailInput = styled(Input)``;

const PasswordInput = styled(Input)``;

const LoginButton = styled(Button)``;

const CancelButton = styled(Button)``;

export default hot(module)(Login);
