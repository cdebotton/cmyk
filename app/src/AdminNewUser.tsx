import gql from 'graphql-tag';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as yup from 'yup';
import { Role, Users, CreateUserMutation, CreateUserMutationVariables } from './types';
import { USERS_QUERY } from './AdminUsers';
import Button from './components/Button';
import EditorLayout, { Form, Heading } from './components/EditorLayout';
import Input from './components/Input';
import Select from './components/Select';
import { useApolloMutation } from './hooks/Apollo';
import { useField, useForm } from './hooks/useForm';

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: UserCreateInput!) {
    createUser(input: $input) {
      id
      email
      createdAt
      updatedAt
      role
      lastLogin
      profile {
        firstName
        lastName
      }
    }
  }
`;

const EmailField = styled(Input)`
  grid-column: 1 / span 2;
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  firstName: yup
    .string()
    .trim()
    .min(2)
    .required(),
  lastName: yup
    .string()
    .trim()
    .min(2)
    .required(),
  password: yup
    .string()
    .trim()
    .min(4)
    .required(),
});

interface Props extends RouteComponentProps<{}> {}

function AdminNewUser({ history }: Props) {
  const mutate = useApolloMutation<CreateUserMutation, CreateUserMutationVariables>(
    CREATE_USER_MUTATION,
  );

  const form = useForm({
    validationSchema,
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      role: Role.UNAUTHORIZED,
    },
    onSubmit: async values => {
      await mutate({
        update: (cache, { data }) => {
          const cacheData = cache.readQuery<Users>({
            query: USERS_QUERY,
          });

          if (!(cacheData && cacheData.users && data && data.createUser)) {
            return;
          }

          cache.writeQuery({
            data: { users: [...cacheData.users, data.createUser] },
            query: USERS_QUERY,
          });
        },
        variables: {
          input: {
            email: values.email,
            password: values.password,
            repeatPassword: values.repeatPassword,
            firstName: values.firstName,
            lastName: values.lastName,
            role: values.role,
          },
        },
      });
      history.push('/admin/users');
    },
  });

  const email = useField('email', form);
  const firstName = useField('firstName', form);
  const lastName = useField('lastName', form);
  const password = useField('password', form);
  const repeatPassword = useField('repeatPassword', form);
  const role = useField('role', form);

  return (
    <EditorLayout>
      <Heading>New user</Heading>

      <Form onSubmit={form.handleSubmit}>
        <EmailField name="email" label="Email" {...email.input} {...email.meta} />
        <Input name="firstName" label="First name" {...firstName.input} {...firstName.meta} />
        <Input name="lastName" label="Last name" {...lastName.input} {...lastName.meta} />
        <Input name="password" label="Password" {...password.input} {...password.meta} />
        <Input
          name="repeatPassword"
          label="Repeat password"
          {...repeatPassword.input}
          {...repeatPassword.meta}
        />
        <Select
          name="role"
          label="Role"
          {...role.input}
          {...role.meta}
          {...role.handlers}
          options={[
            { label: 'Admin', value: Role.ADMIN },
            { label: 'Editor', value: Role.EDITOR },
            { label: 'User', value: Role.USER },
            { label: 'Unauthorized', value: Role.UNAUTHORIZED },
          ]}
        />
        <Button type="submit" disabled={!form.valid} format="neutral">
          Create
        </Button>
        <Button type="reset">Cancel</Button>
      </Form>
    </EditorLayout>
  );
}

export default AdminNewUser;
