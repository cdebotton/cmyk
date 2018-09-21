import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';
import parse from 'date-fns/parse';
import { Field, FieldProps, Formik } from 'formik';
import gql from 'graphql-tag';
import { margin, padding, rem } from 'polished';
import React from 'react';
import { Mutation, MutationFn, Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from './__generated__/DeleteUserMutation';
import { Users, Users_users } from './__generated__/Users';
import Badge from './components/Badge';
import Button from './components/Button';
import ButtonLink from './components/ButtonLink';
import Card from './components/Card';
import Heading from './components/Heading';
import Input from './components/Input';
import Loader from './components/Loader';
import PageLayout from './components/PageLayout';
import { Table, TableRow } from './components/Table';

const AdminUsersLayout = styled(PageLayout)`
  display: grid;
  grid-gap: ${rem(16)};
  grid-template-rows: min-content auto;
  align-content: stretch;
  ${padding(rem(32), rem(16))};
`;

const UsersHeading = styled(Heading)`
  ${padding(0, rem(32), 0, rem(32))};
`;

const AdminTable = styled(Table)`
  ${margin(rem(16), 0, 0, 0)};
`;

const UserLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  ${margin(0, rem(24))};
  align-self: stretch;
`;

const NewUserLink = styled(ButtonLink)``;

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

function AdminUsers({ className, match }: Props) {
  return (
    <AdminUsersLayout className={className}>
      <UsersHeading>Users</UsersHeading>
      <Query<Users, {}> query={USERS_QUERY}>
        {({ data, loading, error }) => {
          if (error) {
            return null;
          }

          if (loading || !data) {
            return <Loader />;
          }

          return (
            <AdminTable
              controls={
                <Formik
                  initialValues={{ searchField: '' }}
                  onSubmit={() => void 0}
                >
                  <form>
                    <Field
                      name="searchField"
                      render={({ field, form }: FieldProps<any>) => (
                        <Input
                          label="Search users..."
                          type="search"
                          field={field}
                          form={form}
                        />
                      )}
                    />
                    <NewUserLink to={`${match.url}/new`}>New user</NewUserLink>
                  </form>
                </Formik>
              }
            >
              {data.users.map(user => (
                <UsersRow key={`USER_${user.id}`}>
                  <UserLink to={`${match.url}/${user.id}`}>
                    <Card
                      imageUrl={
                        user.profile.avatar
                          ? user.profile.avatar.url
                          : undefined
                      }
                      badge={<Badge format="neutral">{user.role}</Badge>}
                      title={getUserTitle(user)}
                      subtitle={getUserSubtitle(user)}
                    />
                  </UserLink>
                  <span>{getFormattedDate(user.createdAt)}</span>
                  <span>{getTimeAgo(user.lastLogin)}</span>
                  <Mutation<DeleteUserMutation, DeleteUserMutationVariables>
                    mutation={DELETE_USER_MUTATION}
                  >
                    {mutate => (
                      <Button onClick={deleteUser(mutate, user.id)}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                      </Button>
                    )}
                  </Mutation>
                </UsersRow>
              ))}
            </AdminTable>
          );
        }}
      </Query>
    </AdminUsersLayout>
  );
}

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      role
      lastLogin
      createdAt
      profile {
        id
        firstName
        lastName
        avatar {
          id
          url
        }
      }
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      id
    }
  }
`;

function deleteUser(
  mutate: MutationFn<DeleteUserMutation, DeleteUserMutationVariables>,
  id: string,
) {
  return () => {
    mutate({
      update: (cache, { data: mutationData }) => {
        const cacheUsers = cache.readQuery<Users>({
          query: USERS_QUERY,
        });

        if (!(cacheUsers && cacheUsers.users)) {
          return;
        }

        cache.writeQuery({
          data: {
            users: cacheUsers.users.filter(u => {
              if (!(mutationData && mutationData.deleteUser)) {
                return true;
              }

              return u.id !== mutationData.deleteUser.id;
            }),
          },
          query: USERS_QUERY,
        });
      },
      variables: { where: { id } },
    });
  };
}

const UsersRow = styled(TableRow)`
  display: grid;
  grid-template-columns: 3fr repeat(2, 1fr) min-content;
  align-items: center;
`;

function getUserTitle(user: Users_users) {
  if (user.profile.firstName && user.profile.lastName) {
    return `${user.profile.firstName} ${user.profile.lastName}`;
  }

  return user.email;
}

function getUserSubtitle(user: Users_users) {
  if (user.profile.firstName && user.profile.lastName) {
    return user.email;
  }

  return null;
}

function getFormattedDate(date: string) {
  const parsed = parse(date);
  if (!isValid(parsed)) {
    return null;
  }
  return format(parsed, 'MMMM DD, YYYY');
}

function getTimeAgo(date: string | null) {
  if (date == null) {
    return 'Never';
  }

  const parsed = parse(date);

  return distanceInWordsToNow(parsed);
}

export default hot(module)(AdminUsers);
