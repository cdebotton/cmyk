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
import { Users, Users_session, Users_users } from './__generated__/Users';
import Badge from './components/Badge';
import Button from './components/Button';
import ButtonLink from './components/ButtonLink';
import Heading from './components/Heading';
import Input from './components/Input';
import LabeledText from './components/LabledText';
import Loader from './components/Loader';
import PageLayout from './components/PageLayout';
import { Table, TableRow } from './components/Table';

const AdminUsersLayout = styled(PageLayout)`
  display: grid;
  grid-gap: ${rem(16)};
  grid-template-rows: min-content auto;
  align-content: stretch;
  ${padding(rem(32), 0, 0)};
`;

const UsersHeading = styled(Heading)`
  ${padding(0, rem(32))};
`;

const AdminTable = styled(Table)`
  ${margin(rem(16), 0, 0, 0)};
`;

const NewUserLink = styled(ButtonLink)`
  text-align: center;
  color: #fff;
`;

const UsersRowContainer = styled(TableRow)`
  display: grid;
  width: 100%;
  grid-gap: ${rem(32)};
  align-items: center;
  grid-template-columns: min-content 2fr repeat(2, 1fr) 2fr;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.05);
`;

function AdminUsersRow(props: {
  className?: string;
  user: Users_users;
  session: Users_session | null;
  url: string;
}) {
  const { className, user, session, url } = props;
  const profileSrc = user.profile.avatar ? user.profile.avatar.url : null;
  const fullName = `${user.profile.firstName} ${user.profile.lastName}`;
  return (
    <UsersRowContainer className={className}>
      {profileSrc && (
        <UserLink to={url}>
          <Avatar src={profileSrc}>
            <RoleBadge format="neutral">{user.role}</RoleBadge>
          </Avatar>
        </UserLink>
      )}
      <LabeledText isLeading label={<UserLink to={url}>{fullName}</UserLink>}>
        <UserLink to={`mailto:${user.email}`}>{user.email}</UserLink>
      </LabeledText>
      <LabeledText label="Last login...">
        {getTimeAgo(user.lastLogin)}
      </LabeledText>
      <LabeledText label="Created on...">
        {getFormattedDate(user.createdAt)}
      </LabeledText>
      {!session ||
        (session.user.id !== user.id && (
          <Mutation<DeleteUserMutation, DeleteUserMutationVariables>
            mutation={DELETE_USER_MUTATION}
          >
            {mutate => (
              <DeleteUserButton onClick={deleteUser(mutate, user.id)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </DeleteUserButton>
            )}
          </Mutation>
        ))}
    </UsersRowContainer>
  );
}

AdminUsersRow.fragments = {
  entry: gql`
    fragment userRow on User {
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
  `,
};

const Avatar = styled.span<{ src: string; size?: number }>`
  position: relative;
  display: inline-block;
  width: ${({ size = 96 }) => rem(size)};
  height: ${({ size = 96 }) => rem(size)};
  background-image: url(${({ src }) => src});
  background-size: cover;
  border-radius: 50%;
  ${margin(rem(16), rem(32))};
`;

const RoleBadge = styled(Badge)`
  position: absolute;
  bottom: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: ${rem(8)};
`;

const DeleteUserButton = styled(Button)`
  justify-self: center;
`;

const UserLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

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
                <>
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
                    </form>
                  </Formik>
                  <NewUserLink to={`${match.url}/new`}>New user</NewUserLink>
                </>
              }
            >
              {data.users.map(user => {
                return (
                  <AdminUsersRow
                    key={`USER_${user.id}`}
                    session={data.session}
                    user={user}
                    url={`${match.url}/${user.id}`}
                  />
                );
              })}
            </AdminTable>
          );
        }}
      </Query>
    </AdminUsersLayout>
  );
}

export const USERS_QUERY = gql`
  query Users {
    session {
      user {
        id
      }
    }
    users {
      ...userRow
    }
  }
  ${AdminUsersRow.fragments.entry}
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
