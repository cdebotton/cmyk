import { Field, Formik } from 'formik';
import gql from 'graphql-tag';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { Login as LoginMutation, LoginVariables } from './__generated__/Login';
import Heading from './components/Heading';
import Session from './containers/Session';

const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data)
  }
`;

interface IProps {
  className?: string;
}

interface IValues {
  email: string;
  password: string;
}

function Login({ className }: IProps) {
  return (
    <Session>
      {({ session, client }) => {
        if (session) {
          return <Redirect to="/admin" />;
        }

        return (
          <div className={className}>
            <Heading level={1}>Login</Heading>
            <Mutation<LoginMutation, LoginVariables> mutation={LOGIN_MUTATION}>
              {mutate => (
                <Formik<IValues>
                  initialValues={{ email: '', password: '' }}
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
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Field name="email" type="email" />
                      <Field name="password" type="password" />
                      <button type="submit">Go</button>
                    </form>
                  )}
                </Formik>
              )}
            </Mutation>
          </div>
        );
      }}
    </Session>
  );
}

export default hot(module)(styled(Login)`
  position: relative;
  display: grid;
`);
