import gql from 'graphql-tag';
import { padding, rem } from 'polished';
import React, { FormEvent, lazy, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as yup from 'yup';
import { Role } from '../../__generated__/globalTypes';
import {
  EditUserQuery,
  EditUserQuery_user_profile_avatar,
  EditUserQueryVariables,
} from './__generated__/EditUserQuery';
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from './__generated__/UpdateUserMutation';
import Button from './components/Button';
import EditorLayout, { Heading } from './components/EditorLayout';
import ImageSelector from './components/ImageSelector';
import Select from './components/Select';
import SimpleInput from './components/SimpleInput';
import { useApolloMutation, useApolloQuery } from './hooks/Apollo';
import useFileUpload from './hooks/useFileUpload';
import { useField, useForm } from './hooks/useForm';

const EDIT_USER_QUERY = gql`
  query EditUserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      role
      profile {
        id
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
  mutation UpdateUserMutation(
    $data: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ) {
    updateUser(data: $data, where: $where) {
      id
      email
      role
      profile {
        id
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

const UserForm = styled.form`
  grid-column: 2 / span 1;
  grid-gap: ${rem(16)};
  display: grid;
  grid-template-columns: ${rem(128)} repeat(4, 1fr);
  align-content: start;
  ${padding(0, rem(32))};
`;

const AvatarInput = styled(ImageSelector)`
  grid-column: span 1;
  grid-row: span 2;
`;

const EmailInput = styled(SimpleInput)`
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
  avatar: EditUserQuery_user_profile_avatar | null;
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
  } = useApolloQuery<EditUserQuery, EditUserQueryVariables>(EDIT_USER_QUERY, {
    variables: { where: { id: match.params.userId } },
  });

  if (!user) {
    return <NotFound {...props} />;
  }

  const updateUserMutation = useApolloMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(USER_UPDATE_MUTATION);

  async function updateUser(values: Values) {
    if (!user) {
      return;
    }

    await updateUserMutation({
      variables: {
        data: {
          email: values.email,
          profile: {
            update: {
              avatar: values.avatar
                ? { connect: { id: values.avatar.id } }
                : null,
              firstName: values.firstName,
              lastName: values.lastName,
            },
          },
          role: values.role,
        },
        where: { id: user.id },
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

  const email = useField('email', form);
  const firstName = useField('firstName', form);
  const lastName = useField('lastName', form);
  const avatar = useField('avatar', form);
  const role = useField('role', form);

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
        avatar.handlers.setValue(data);
      }
    },
    [data],
  );

  return (
    <EditorLayout className={className}>
      <Heading>Edit User {user.email}</Heading>
      <UserForm onSubmit={form.handleSubmit} autoComplete="off">
        <AvatarInput
          value={avatar.input.value}
          name="avatar"
          onChange={handleFileChange}
          error={error}
          uploading={uploading}
        />
        <EmailInput
          name="email"
          label="Email"
          {...email.input}
          {...email.meta}
        />
        <SimpleInput
          name="firstName"
          label="First name"
          {...firstName.input}
          {...firstName.meta}
        />
        <SimpleInput
          name="lastName"
          label="Last name"
          {...lastName.input}
          {...lastName.meta}
        />
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
        <SaveButton
          format="neutral"
          disabled={!form.valid || form.submitting || !form.dirty}
        >
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
      </UserForm>
    </EditorLayout>
  );
}

export default AdminEditUser;
