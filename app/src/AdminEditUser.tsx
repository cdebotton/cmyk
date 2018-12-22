import gql from 'graphql-tag';
import React, { FormEvent, lazy, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components/macro';
import * as yup from 'yup';
import {
  Role,
  User,
  User_user_profile_avatar,
  UserVariables,
  TUpdateUser,
  TUpdateUserVariables,
} from './types';
import Button from './components/Button';
import EditorLayout, { Form, Heading } from './components/EditorLayout';
import ImageSelector from './components/ImageSelector';
import Input from './components/Input';
import Select from './components/Select';
import { useMutation, useQuery } from './hooks/useApollo';
import useFileUpload from './hooks/useFileUpload';
import { useField, useForm } from './hooks/useForm';
import useTitle from './hooks/useTitle';

const EDIT_USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      email
      role
      profile {
        avatar {
          id
          key
          bucket
          url
        }
        firstName
        lastName
      }
    }
  }
`;

const USER_UPDATE_MUTATION = gql`
  mutation TUpdateUser($input: UserUpdateInput!, $id: ID!) {
    updateUser(input: $input, id: $id) {
      id
      email
      role
      profile {
        avatar {
          id
          bucket
          key
        }
        firstName
        lastName
      }
    }
  }
`;

const AvatarInput = styled(ImageSelector)`
  grid-column: span 1;
  grid-row: span 2;
`;

const EmailInput = styled(Input)`
  grid-column: span 2;
`;

const SaveButton = styled(Button).attrs({ type: 'submit' })`
  grid-column: span 1;
`;

const CancelButton = styled(Button).attrs({ type: 'reset' })`
  grid-column: span 1;
`;

const NotFound = lazy(() => import('./NotFound'));

interface Values {
  avatar: User_user_profile_avatar | null;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

interface Props extends RouteComponentProps<{ userId: string }> {
  className?: string;
}

function AdminEditUser({ className, ...props }: Props) {
  const { match, history } = props;
  const {
    data: { user },
  } = useQuery<User, UserVariables>(EDIT_USER_QUERY, {
    variables: { id: match.params.userId },
  });

  if (!user) {
    return <NotFound {...props} />;
  }

  useTitle(`Edit ${user.email} | Admin`);

  const updateUserMutation = useMutation<TUpdateUser, TUpdateUserVariables>(USER_UPDATE_MUTATION);

  async function updateUser(values: Values) {
    if (!user) {
      return;
    }

    await updateUserMutation({
      variables: {
        input: {
          email: values.email,
          avatar: values.avatar ? values.avatar.id : null,
          firstName: values.firstName,
          lastName: values.lastName,
          role: values.role,
        },
        id: user.id,
      },
    });

    history.push('/admin/users');
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Must be a valid email address')
      .required('Email required'),
    firstName: yup
      .string()
      .min(2, 'First name must be longer than 2 characters')
      .required('First name is required'),
    lastName: yup
      .string()
      .min(2, 'Last name must be longer than 2 characters')
      .required('Last name is required'),
  });

  const form = useForm({
    validationSchema,
    initialValues: {
      avatar: user.profile.avatar,
      email: user.email,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      role: user.role,
    },
    onSubmit: values => {
      return updateUser({
        avatar: values.avatar,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
      });
    },
  });

  const email = useField(form, 'email');
  const firstName = useField(form, 'firstName');
  const lastName = useField(form, 'lastName');
  const avatar = useField(form, 'avatar');
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
    <EditorLayout className={className}>
      <Heading>Edit {user.email}</Heading>
      <Form onSubmit={form.handleSubmit} autoComplete="off">
        <AvatarInput
          value={avatar.input.value}
          name="avatar"
          onChange={handleFileChange}
          error={error}
          uploading={uploading}
        />
        <EmailInput name="email" label="Email" {...email.input} {...email.meta} />
        <Input name="firstName" label="First name" {...firstName.input} {...firstName.meta} />
        <Input name="lastName" label="Last name" {...lastName.input} {...lastName.meta} />
        <Select
          {...role.input}
          {...role.meta}
          {...role.handlers}
          name="role"
          label="Role"
          options={[
            { label: 'Admin', value: Role.ADMIN },
            { label: 'Editor', value: Role.EDITOR },
            { label: 'User', value: Role.USER },
            { label: 'Unauthorized', value: Role.UNAUTHORIZED },
          ]}
        />
        <SaveButton format="neutral" disabled={!form.valid || form.submitting || !form.dirty}>
          {form.submitting ? 'Saving...' : 'Save'}
        </SaveButton>
        <CancelButton
          onClick={() => {
            form.handleReset();
            history.goBack();
          }}
        >
          Cancel
        </CancelButton>
      </Form>
    </EditorLayout>
  );
}

export default AdminEditUser;
