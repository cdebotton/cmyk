import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';
import parse from 'date-fns/parse';
import gql from 'graphql-tag';
import { padding, position, rem, size } from 'polished';
import React from 'react';
import { Mutation, MutationFn, Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring';
import styled from 'styled-components';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from './__generated__/DeleteUserMutation';
import {
  Users,
  Users_session,
  Users_users,
  Users_users_profile,
} from './__generated__/Users';
import Avatar from './components/Avatar';
import Loader from './components/Loader';
import PageHeading from './components/PageHeading';
import PageLayout from './components/PageLayout';
import Toggle from './containers/Toggle';

export const USERS_QUERY = gql`
  query Users {
    session {
      user {
        id
      }
    }
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

const UserList = styled.ul`
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-gap: ${rem(16)};
  perspective: 800px;
  transform-style: preserve-3d;
`;

const UserListItem = styled.li`
  border-radius: 5px;
  ${padding(rem(8))};
`;

const UserLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: grid;
  align-items: center;
  grid-template-columns: min-content 2fr repeat(3, 1fr);
  grid-auto-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 0 ${rem(16)};
  grid-auto-flow: column dense;
`;

const UserName = styled.span`
  font-size: ${rem(24)};
  font-family: 'Raleway', sans-serif;
  align-self: end;
`;

const UserEmail = styled.span`
  font-size: ${rem(14)};
  align-self: start;
  opacity: 0.4;
`;

const UserAvatar = styled(Avatar)`
  position: relative;
  grid-row: span 2;
  border-radius: 9px;
`;

const Label = styled.span`
  font-size: ${rem(16)};
  opacity: 0.4;
  align-self: end;
`;

function getAvatar(profile: Users_users_profile) {
  if (profile.avatar) {
    return profile.avatar.url;
  }

  return '';
}

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

function AdminUsers({ className, match }: Props) {
  return (
    <PageLayout className={className}>
      <PageHeading>Users</PageHeading>
      <Query<Users, {}> query={USERS_QUERY}>
        {({ data, loading, error }) => {
          if (error) {
            return null;
          }

          if (loading || !data) {
            return <Loader />;
          }

          return (
            <UserList>
              {data.users.map(user => {
                const avatar = getAvatar(user.profile);
                return (
                  <Toggle key={`USER_${user.id}`}>
                    {({ on, setOn, setOff }) => {
                      const to = on
                        ? {
                            backgroundColor: 'hsla(0, 0%, 100%, 0.175)',
                            boxShadow: '0px 10px 40px hsla(0, 0%, 0%, 0.4)',
                            transform: 'translate3d(0, 0, 20px)',
                          }
                        : {
                            backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
                            boxShadow: '0px 0px 10px hsla(0, 0%, 0%, 0.1)',
                            transform: 'translate3d(0, 0, 0px)',
                          };

                      return (
                        <Spring to={to}>
                          {styles => (
                            <UserListItem
                              onMouseEnter={setOn}
                              onMouseLeave={setOff}
                              style={styles}
                            >
                              <UserLink to={`${match.url}/${user.id}`}>
                                <UserAvatar src={avatar} size={96} />
                                <UserName>
                                  {user.profile.firstName}{' '}
                                  {user.profile.lastName}
                                </UserName>
                                <UserEmail>{user.email}</UserEmail>
                                <Label>Last login</Label>
                              </UserLink>
                            </UserListItem>
                          )}
                        </Spring>
                      );
                    }}
                  </Toggle>
                );
              })}
            </UserList>
          );
        }}
      </Query>
    </PageLayout>
  );
}

export default hot(module)(AdminUsers);
