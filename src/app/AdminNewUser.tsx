import gql from 'graphql-tag';
import { rem } from 'polished';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as yup from 'yup';
import { Role } from '../../__generated__/globalTypes';
import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from './__generated__/CreateUserMutation';
import { Users } from './__generated__/Users';
import { USERS_QUERY } from './AdminUsers';
import Button from './components/Button';
import Heading from './components/Heading';
import PageLayout from './components/PageLayout';
import Select from './components/Select';
import SimpleInput from './components/SimpleInput';
import { useApolloMutation } from './hooks/Apollo';
import { useField, useForm } from './hooks/useForm';

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($data: UserCreateInput!) {
    createUser(data: $data) {
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

const NewUserForm = styled.form`
  display: grid;
  grid-gap: ${rem(16)};
  grid-template-columns: repeat(4, 1fr);
`;

const EmailField = styled(SimpleInput)`
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
          data: {
            email: values.email,
            password: values.password,
            profile: {
              create: {
                firstName: values.firstName,
                lastName: values.lastName,
              },
            },
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
    <PageLayout>
      <Heading>New user</Heading>
      <NewUserForm onSubmit={form.handleSubmit}>
        <EmailField name="email" label="Email" {...email.input} {...email.meta} />
        <SimpleInput name="firstName" label="First name" {...firstName.input} {...firstName.meta} />
        <SimpleInput name="lastName" label="Last name" {...lastName.input} {...lastName.meta} />
        <SimpleInput name="password" label="Password" {...password.input} {...password.meta} />
        <SimpleInput
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
      </NewUserForm>
    </PageLayout>
  );
}

export default AdminNewUser;
