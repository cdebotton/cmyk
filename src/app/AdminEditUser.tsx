import React, { SFC, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult, Mutation, MutationFn } from 'react-apollo';
import PageLoader from './components/molecules/PageLoader';
import { RouteComponentProps } from 'react-router';
import Heading from './components/atoms/Heading';
import { Formik, Field } from 'formik';

type Props = RouteComponentProps<{
  userId: string;
}>;

type EditUserResponse = {
  user: {
    id: string;
    email: string;
    role: 'ADMIN' | 'EDITOR' | 'USER' | 'UNAUTHORIZED';
    profile: {
      firstName: string;
      lastName: string;
    };
  };
};

type UpdateUserData = {};

type UpdateUserVariables = {
  where: { id: string };
  data: {
    email: string;
    role: 'ADMIN' | 'EDITOR' | 'USER' | 'UNAUTHORIZED';
    profile: {
      update: {
        firstName: string;
        lastName: string;
      };
    };
  };
};

const AdminEditUser: SFC<Props> = ({
  match: {
    params: { userId },
  },
}) => (
  <div>
    <Query query={getEditUserQuery} variables={{ where: { id: userId } }}>
      {({ data, error }: QueryResult<EditUserResponse>) => {
        if (!data || !data.user) {
          return <PageLoader />;
        }

        if (error) {
          return null;
        }

        return (
          <Fragment>
            <Heading level={3}>Edit user {data.user.email}</Heading>
            <Mutation mutation={updateUserMutation}>
              {(
                updateUser: MutationFn<UpdateUserData, UpdateUserVariables>,
              ) => (
                <Formik
                  key={data.user.id}
                  initialValues={{
                    email: data.user.email,
                    role: data.user.role,
                    firstName: data.user.profile.firstName || '',
                    lastName: data.user.profile.lastName || '',
                  }}
                  onSubmit={values => {
                    updateUser({
                      variables: {
                        where: { id: data.user.id },
                        data: {
                          email: values.email,
                          role: values.role,
                          profile: {
                            update: {
                              firstName: values.firstName,
                              lastName: values.lastName,
                            },
                          },
                        },
                      },
                    });
                  }}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Field type="email" component="input" name="email" />
                      <Field component="select" name="role">
                        <option value="ADMIN">Admin</option>
                        <option value="EDITOR">Editor</option>
                        <option value="USER">User</option>
                        <option value="UNAUTHORIZED">Unauthorized</option>
                      </Field>
                      <Field type="text" component="input" name="firstName" />
                      <Field type="text" component="input" name="lastName" />
                      <button type="submit">Save</button>
                    </form>
                  )}
                </Formik>
              )}
            </Mutation>
          </Fragment>
        );
      }}
    </Query>
  </div>
);

const updateUserMutation = gql`
  mutation UpdateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      email
      role
      profile {
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`;

const getEditUserQuery = gql`
  query GetEditUser($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      role
      profile {
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`;

export default AdminEditUser;
