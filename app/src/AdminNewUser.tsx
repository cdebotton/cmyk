import gql from 'graphql-tag';
import React, { FormEvent, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as yup from 'yup';
import { Role, Users, CreateUserMutation, CreateUserMutationVariables } from './types';
import { USERS_QUERY } from './AdminUsers';
import Button from './components/Button';
import EditorLayout, { Form, Heading } from './components/EditorLayout';
import ImageSelector from './components/ImageSelector';
import Input from './components/Input';
import Select from './components/Select';
import { useMutation } from 'react-apollo-hooks';
import { useField, useForm } from './hooks/useForm';
import useFileUpload from './hooks/useFileUpload';
import useTitle from './hooks/useTitle';

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: UserCreateInput!) {
    createUser(input: $input) {
      id
      email
      createdAt
      updatedAt
      role
      profile {
        avatar {
          id
          bucket
          key
        }
        firstName
        lastName
        lastLogin
      }
    }
  }
`;

const AvatarInput = styled(ImageSelector)`
  grid-column: span 1;
  grid-row: span 2;
`;

const EmailField = styled(Input)`
  grid-column: 2 / span 2;
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
  useTitle('New user | Admin');

  const mutate = useMutation<CreateUserMutation, CreateUserMutationVariables>(CREATE_USER_MUTATION);

  const form = useForm<{
    avatar: { key: string; bucket: string; url: string; id: string } | null;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    repeatPassword: string;
    role: Role;
  }>({
    validationSchema,
    initialValues: {
      avatar: null,
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
            avatar: values.avatar ? values.avatar.id : null,
          },
        },
      });
      history.push('/admin/users');
    },
  });

  const email = useField(form, 'email');
  const avatar = useField(form, 'avatar');
  const firstName = useField(form, 'firstName');
  const lastName = useField(form, 'lastName');
  const password = useField(form, 'password');
  const repeatPassword = useField(form, 'repeatPassword');
  const role = useField(form, 'role');

  const [upload, { data, error, uploading }] = useFileUpload();

  async function handleFileChange(event: FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.files) {
      return;
    }

    const file = event.currentTarget.files[0];

    upload(file);
  }

  useEffect(
    () => {
      if (data) {
        avatar.change(data);
      }
    },
    [data],
  );

  return (
    <EditorLayout>
      <Heading>New user</Heading>
      <Form onSubmit={form.handleSubmit}>
        <AvatarInput
          value={avatar.input.value}
          name="avatar"
          onChange={handleFileChange}
          error={error}
          uploading={uploading}
        />
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
