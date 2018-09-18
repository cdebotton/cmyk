import { Field, Formik } from 'formik';
import gql from 'graphql-tag';
import { History } from 'history';
import { rem } from 'polished';
import React, { FormEvent } from 'react';
import { Mutation, MutationFn, Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Role } from '../../__generated__/globalTypes';
import {
  EditUserQuery,
  EditUserQuery_user_profile_avatar,
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
import Heading from './components/Heading';
import ImageSelector from './components/ImageSelector';
import Input from './components/Input';
import PageLayout from './components/PageLayout';
import Select from './components/Select';
import DynamicComponent from './containers/DynamicComponent';

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

  return (
    <Query<EditUserQuery, {}>
      query={EDIT_USER_QUERY}
      variables={{ where: { id: match.params.userId } }}
    >
      {({ data, loading, error }) => {
        if (error) {
          return null;
        }

        if (loading || !data) {
          return null;
        }

        const { user } = data;

        if (user === null) {
          return (
            <DynamicComponent {...props} loader={() => import('./NotFound')} />
          );
        }

        return (
          <AdminEditUserLayout className={className}>
            <Heading>Edit User {user.email}</Heading>
            <Mutation<UpdateUserMutation, UpdateUserMutationVariables>
              mutation={USER_UPDATE_MUTATION}
            >
              {mutate => (
                <Formik<Values>
                  key={user.id}
                  validationSchema={UserSchema}
                  onSubmit={updateUser(user.id, mutate, history)}
                  initialValues={{
                    avatar: user.profile.avatar,
                    email: user.email,
                    firstName:
                      user.profile && user.profile.firstName !== null
                        ? user.profile.firstName
                        : '',
                    lastName:
                      user.profile && user.profile.lastName !== null
                        ? user.profile.lastName
                        : '',
                    role: user.role,
                  }}
                >
                  {({ handleSubmit, setFieldValue }) => (
                    <UserForm onSubmit={handleSubmit}>
                      <Mutation<UploadFileMutation, UploadFileMutationVariables>
                        mutation={UPLOAD_FILE_MUTATION}
                      >
                        {uploadFile => (
                          <Field
                            name="avatar"
                            component={ImageSelector}
                            file={user.profile.avatar}
                            onFileChange={async (
                              event: FormEvent<HTMLInputElement>,
                            ) => {
                              if (!event.currentTarget.files) {
                                return;
                              }

                              const file = event.currentTarget.files[0];

                              const uploadResult = await uploadFile({
                                update: (cache, { data: uploadData }) => {},
                                variables: {
                                  file,
                                },
                              });

                              if (!(uploadResult && uploadResult.data)) {
                                return;
                              }

                              setFieldValue(
                                'avatar',
                                uploadResult.data.uploadFile,
                              );
                            }}
                            label="Avatar"
                          />
                        )}
                      </Mutation>
                      <Field
                        name="email"
                        component={EmailInput}
                        label="Email"
                      />
                      <Field
                        name="firstName"
                        component={Input}
                        label="First name"
                      />
                      <Field
                        name="lastName"
                        component={Input}
                        label="Last name"
                      />
                      <Field
                        name="role"
                        component={Select}
                        label="Role"
                        options={[
                          { label: 'Admin', value: Role.ADMIN },
                          { label: 'Editor', value: Role.EDITOR },
                          { label: 'User', value: Role.USER },
                          { label: 'Unauthorized', value: Role.UNAUTHORIZED },
                        ]}
                      />
                      <SaveButton format="neutral">Save</SaveButton>
                      <CancelButton>Cancel</CancelButton>
                    </UserForm>
                  )}
                </Formik>
              )}
            </Mutation>
          </AdminEditUserLayout>
        );
      }}
    </Query>
  );
}

export default hot(module)(AdminEditUser);

const EDIT_USER_QUERY = gql`
  query EditUserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
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
  mutation UpdateUserMutation(
    $data: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ) {
    updateUser(data: $data, where: $where) {
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

const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFileMutation($file: Upload!) {
    uploadFile(file: $file) {
      id
      bucket
      key
    }
  }
`;

const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address')
    .required('Email required'),
  firstName: Yup.string()
    .min(2, 'First name must be longer than 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be longer than 2 characters')
    .required('Last name is required'),
});

function updateUser(
  id: string,
  mutate: MutationFn<UpdateUserMutation, UpdateUserMutationVariables>,
  history: History,
): (values: Values) => Promise<void> {
  return async values => {
    const avatar = values.avatar
      ? {
          connect: { id: values.avatar.id },
        }
      : null;

    await mutate({
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
        where: { id },
      },
    });

    history.push('/admin/users');
  };
}

const AdminEditUserLayout = styled(PageLayout)`
  position: relative;
`;

const UserForm = styled.form`
  grid-gap: ${rem(16)};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const EmailInput = styled(Input)`
  grid-column: 1 / span 2;
`;

const SaveButton = styled(Button).attrs({ type: 'submit' })`
  grid-column: 3 / span 1;
`;

const CancelButton = styled(Button).attrs({ type: 'rest' })`
  grid-column: 4 / span 1;
`;
