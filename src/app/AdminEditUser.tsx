import { Field, Formik } from 'formik';
import gql from 'graphql-tag';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { EditUserQuery } from './__generated__/EditUserQuery';
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from './__generated__/UpdateUserMutation';
import Heading from './components/Heading';
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

interface IValues {
  email: string;
  firstName: string;
  lastName: string;
}

interface IProps extends RouteComponentProps<{ userId: string }> {
  className?: string;
}

function AdminEditUser({ className, match, ...props }: IProps) {
  return (
    <div className={className}>
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
              <DynamicComponent
                match={match}
                {...props}
                loader={() => import('./NotFound')}
              />
            );
          }

          const EMPTY_PROFILE = { firstName: '', lastName: '' };

          const { profile = EMPTY_PROFILE } = user;

          return (
            <>
              <Heading>Edit User {user.email}</Heading>
              <Mutation<UpdateUserMutation, UpdateUserMutationVariables>
                mutation={USER_UPDATE_MUTATION}
              >
                {mutate => (
                  <Formik<IValues>
                    onSubmit={values => {
                      // tslint:disable-next-line no-console
                      mutate({
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
                      <form onSubmit={handleSubmit}>
                        <Field name="email" />
                        <button type="submit">Save</button>
                      </form>
                    )}
                  </Formik>
                )}
              </Mutation>
            </>
          );
        }}
      </Query>
    </div>
  );
}

export default hot(module)(styled(AdminEditUser)`
  display: grid;
`);
