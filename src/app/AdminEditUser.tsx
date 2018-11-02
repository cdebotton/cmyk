import gql from 'graphql-tag';
import { padding, rem } from 'polished';
import React, { FormEvent, lazy } from 'react';
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
import {
  UploadFileMutation,
  UploadFileMutationVariables,
} from './__generated__/UploadFileMutation';
import Button from './components/Button';
import ImageSelector from './components/ImageSelector';
import Layout from './components/Layout';
import PageHeading from './components/PageHeading';
import Select from './components/Select';
import SimpleInput from './components/SimpleInput';
import { useApolloMutation, useApolloQuery } from './hooks/Apollo';
import useFormInput, { Field } from './hooks/useFormInput';

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

const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFileMutation($file: Upload!) {
    uploadFile(file: $file) {
      id
      bucket
      key
      url
    }
  }
`;

const AdminEditUserLayout = styled(Layout)`
  align-content: start;
`;

const EditUserHeading = styled(PageHeading)`
  grid-column: 2 / span 1;
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

    const avatar = values.avatar
      ? {
          connect: { id: values.avatar.id },
        }
      : null;

    await updateUserMutation({
      variables: {
        data: {
          email: values.email,
          profile: {
            update: {
              avatar,
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

  const updateFileMutation = useApolloMutation<
    UploadFileMutation,
    UploadFileMutationVariables
  >(UPLOAD_FILE_MUTATION);

  async function handleFileChange(event: FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.files) {
      return;
    }

    const file = event.currentTarget.files[0];

    const uploadResult = await updateFileMutation({
      // update: (cache, { data: uploadData }) => {},
      variables: {
        file,
      },
    });

    if (!(uploadResult && uploadResult.data)) {
      return;
    }

    return uploadResult.data;
  }

  const [email, resetEmail] = useFormInput({
    initialValue: user.email,
    validate: yup
      .string()
      .email('Must be a valid email address')
      .required('Email required'),
  });
  const [firstName, resetFirstName] = useFormInput({
    initialValue: user.profile.firstName,
    validate: yup
      .string()
      .min(2, 'First name must be longer than 2 characters')
      .required('First name is required'),
  });
  const [lastName, resetLastName] = useFormInput({
    initialValue: user.profile.lastName,
    validate: yup
      .string()
      .min(2, 'Last name must be longer than 2 characters')
      .required('Last name is required'),
  });
  const [image, resetImage] = useFormInput({
    initialValue: user.profile.avatar,
  });
  const [role, resetRole] = useFormInput<Role>({
    initialValue: user.role,
  });

  function handleReset() {
    resetEmail();
    resetFirstName();
    resetLastName();
    resetRole();
    resetImage();
  }

  function handleSubmit() {
    updateUser({
      avatar: image.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      role: role.value,
    });
  }

  return (
    <AdminEditUserLayout className={className}>
      <EditUserHeading>Edit User {user.email}</EditUserHeading>

      <UserForm onSubmit={handleSubmit} autoComplete="off">
        <AvatarInput
          file={user.profile.avatar}
          name="avatar"
          {...image}
          onFileChange={async event => {
            const uploadResult = await handleFileChange(event);

            if (!uploadResult) {
              return;
            }

            image.setValue(uploadResult.uploadFile);
          }}
        />

        <EmailInput name="email" label="Email" {...email} />
        <SimpleInput name="firstName" label="First name" {...firstName} />
        <SimpleInput name="lastName" label="Last name" {...lastName} />
        <Select
          {...role}
          name="role"
          label="Role"
          options={[
            { label: 'Admin', value: Role.ADMIN },
            { label: 'Editor', value: Role.EDITOR },
            { label: 'User', value: Role.USER },
            { label: 'Unauthorized', value: Role.UNAUTHORIZED },
          ]}
        />
        <SaveButton format="neutral">Save</SaveButton>
        <CancelButton
          onClick={() => {
            handleReset();
            history.goBack();
          }}
        >
          Cancel
        </CancelButton>
      </UserForm>
    </AdminEditUserLayout>
  );
}

export default AdminEditUser;
