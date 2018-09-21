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

interface IProps extends RouteComponentProps<{}> {
  className?: string;
}

interface Values {
  email: string;
  password: string;
}

function Login({ className, location }: IProps) {
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
          <div className={className}>
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
          </div>
        );
      }}
    </Session>
  );
}

const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.35);
  padding: ${rem(32)};
  display: grid;
  grid-template-rows: repeat(3, min-content);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${rem(32)};
  width: 100%;
  box-shadow: 0 2px 5px 0 rgba(20, 20, 20, 0.5);
  border-radius: 3px;
`;

const LoginHeading = styled(Heading)`
  grid-row: 1 / span 1;
  grid-column: 1 / span 4;
  text-transform: uppercase;
`;

const EmailInput = styled(Input)`
  grid-row: 2 / span 1;
  grid-column: 1 / span 2;
`;

const PasswordInput = styled(Input)`
  grid-row: 2 / span 1;
  grid-column: 3 / span 2;
`;

const LoginButton = styled(Button)`
  grid-row: 3 / span 1;
  grid-column: 3 / span 1;
`;

const CancelButton = styled(Button)`
  grid-row: 3 / span 1;
  grid-column: 4 / span 1;
`;

function generateBackground() {
  const STEPS = 2;
  const arr = Array.from({ length: STEPS });
  const steps = arr.reduce<string[]>((acc, _, key) => {
    const l = 2 + key * 5;
    const step = 100 / STEPS;
    const start = key * step;
    const end = (key + 1) * step;
    return [
      ...acc,
      `hsla(212, 50%, ${l}%, 1.0) ${start}%`,
      `hsla(190, 50%, ${l}%, 1.0) ${end}%`,
    ];
  }, []);
  return `background-image: linear-gradient(to bottom right, ${steps.join(
    ', ',
  )})`;
}

export default hot(module)(styled(Login)`
  position: relative;
  display: grid;
  grid-template-columns: 46%;
  background-repeat: no-repeat;
  background-size: 100% 50%;
  background-color: rgba(0, 0, 0, 0.93);
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  ${generateBackground()};
`);
