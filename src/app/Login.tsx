import gql from 'graphql-tag';
import { padding, rem } from 'polished';
import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as yup from 'yup';
import { Login as LoginMutation, LoginVariables } from './generated/Login';
import { Session } from './generated/Session';
import Button from './components/Button';
import Heading from './components/Heading';
import Input from './components/Input';
import { useApolloClient, useApolloMutation, useApolloQuery } from './hooks/Apollo';
import { useField, useForm } from './hooks/useForm';
import GlobalStyles from './styles/AdminStyles';
import background from './styles/background';

const loginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`;

const sessionQuery = gql`
  query Session {
    session {
      iat
    }
  }
`;

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

function Login({ className, location }: Props) {
  const client = useApolloClient();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      mutate();
    },
    validationSchema: yup.object<{ email: string; password: string }>().shape({
      email: yup
        .string()
        .required()
        .email(),
      password: yup.string().required(),
    }),
  });

  const { handleSubmit, valid } = form;

  const email = useField('email', form);
  const password = useField('password', form);

  if (!client) {
    throw new Error("Can't find Apollo client, please wrap application in <ApolloProvider />");
  }

  const {
    data: { session },
  } = useApolloQuery<Session>(sessionQuery);

  const mutate = useApolloMutation<LoginMutation, LoginVariables>(loginMutation, {
    update: (proxy, { data: result }) => {
      if (result && result.login) {
        localStorage.setItem('jwt', result.login);
        client.resetStore();
      }
    },
    variables: {
      input: {
        email: email.input.value,
        password: password.input.value,
      },
    },
  });

  if (session) {
    const to = location.state && location.state.attempt ? location.state.attempt : '/admin';

    return <Redirect to={to} />;
  }

  return (
    <LoginContainer className={className}>
      <GlobalStyles />
      <Form onSubmit={handleSubmit}>
        <LoginHeading level={1}>Login</LoginHeading>
        <EmailInput name="email" label="Email" {...email.input} {...email.meta} />
        <PasswordInput
          type="password"
          name="password"
          label="Password"
          {...password.input}
          {...password.meta}
        />
        <LoginButton type="submit" disabled={!valid}>
          Go
        </LoginButton>
      </Form>
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
