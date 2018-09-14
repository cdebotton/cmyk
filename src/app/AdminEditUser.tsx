import { Field, Formik } from 'formik';
import gql from 'graphql-tag';
import { rem } from 'polished';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import * as Yup from 'yup';
import { EditUserQuery } from './__generated__/EditUserQuery';
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from './__generated__/UpdateUserMutation';
import Button from './components/Button';
import Heading from './components/Heading';
import Input from './components/Input';
import PageLayout from './components/PageLayout';
import DynamicComponent from './containers/DynamicComponent';

const USER_QUERY = gql`
  query EditUserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      profile {
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
      profile {
        firstName
        lastName
      }
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

interface IValues {
  email: string;
  firstName: string;
  lastName: string;
}

interface Props extends RouteComponentProps<{ userId: string }> {
  className?: string;
}

function AdminEditUser({ className, ...props }: Props) {
  const { match, history } = props;

  return (
    <Query<EditUserQuery, {}>
      query={USER_QUERY}
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
                <Formik<IValues>
                  key={user.id}
                  validationSchema={UserSchema}
                  onSubmit={async values => {
                    // tslint:disable-next-line no-console
                    try {
                      await mutate({
                        variables: {
                          data: {
                            email: values.email,
                            profile: {
                              update: {
                                firstName: values.firstName,
                                lastName: values.lastName,
                              },
                            },
                          },
                          where: { id: user.id },
                        },
                      });

                      history.push('/admin/users');
                      // tslint:disable-next-line no-empty
                    } finally {
                    }
                  }}
                  initialValues={{
                    email: user.email,
                    firstName:
                      user.profile && user.profile.firstName !== null
                        ? user.profile.firstName
                        : '',
                    lastName:
                      user.profile && user.profile.lastName !== null
                        ? user.profile.lastName
                        : '',
                  }}
                >
                  {({ handleSubmit }) => (
                    <UserForm onSubmit={handleSubmit}>
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
