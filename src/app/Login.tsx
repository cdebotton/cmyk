import gql from 'graphql-tag';
import { padding, rem } from 'polished';
import React, { useMemo } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as yup from 'yup';
import { Login as LoginMutation, LoginVariables } from './__generated__/Login';
import { Session } from './__generated__/Session';
import Button from './components/Button';
import Heading from './components/Heading';
import SimpleInput from './components/SimpleInput';
import {
  useApolloClient,
  useApolloMutation,
  useApolloQuery,
} from './hooks/Apollo';
import useFormInput from './hooks/useFormInput';
import GlobalStyles from './styles/AdminStyles';
import background from './styles/background';

const loginMutation = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data)
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
  const email = useFormInput({
    initialValue: '',
    validate: yup
      .string()
      .email()
      .required(),
  });

  const password = useFormInput({
    initialValue: '',
    validate: yup.string().required(),
  });

  const isValid = useMemo(
    () => {
      return email.error === null && password.error === null;
    },
    [email.error, password.error],
  );

  if (!client) {
    throw new Error(
      "Can't find Apollo client, please wrap application in <ApolloProvider />",
    );
  }

  const {
    data: { session },
  } = useApolloQuery<Session>(sessionQuery);

  const mutate = useApolloMutation<LoginMutation, LoginVariables>(
    loginMutation,
    {
      update: (proxy, { data: result }) => {
        if (result && result.login) {
          localStorage.setItem('jwt', result.login);
          client.resetStore();
        }
      },
      variables: {
        data: {
          email: email.value,
          password: password.value,
        },
      },
    },
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
      <Form
        onSubmit={event => {
          event.preventDefault();
          mutate();
        }}
      >
        <LoginHeading level={1}>Login</LoginHeading>
        <EmailInput name="email" label="Email" {...email} />
        <PasswordInput
          type="password"
          name="password"
          label="Password"
          {...password}
        />
        <LoginButton type="submit" disabled={!isValid}>
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

const EmailInput = styled(SimpleInput)``;

const PasswordInput = styled(SimpleInput)``;

const LoginButton = styled(Button)`
  grid-column: 2 / span 1;
`;

export default Login;
