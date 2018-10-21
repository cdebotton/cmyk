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
import { animated, Spring, Transition } from 'react-spring';
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
import AnimatedCross from './components/AnimatedCross';
import Avatar from './components/Avatar';
import ButtonLink from './components/ButtonLink';
import Confirm from './components/Confirm';
import Loader from './components/Loader';
import PageHeading from './components/PageHeading';
import PageLayout from './components/PageLayout';
import PortalManager from './containers/PortalManager';
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
) {
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
  });
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

  return distanceInWordsToNow(parsed) + ' ago';
}

const UsersLayout = styled(PageLayout)`
  grid-template-columns: ${rem(32)} auto ${rem(32)};
  perspective: 800px;
  transform-style: preserve-3d;
`;

const UsersHeading = styled(PageHeading)`
  grid-column: 2 / span 1;
`;

const UserList = styled.ul`
  grid-column: 2 / span 1;
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-gap: ${rem(16)};
`;

const UserListItemContainer = styled(animated.li)`
  border-radius: 5px;
  ${padding(rem(8))};
  perspective: 800px;
  transform-style: preserve-3d;
`;

const UserLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: grid;
  align-items: center;
  grid-template-columns: min-content 2fr repeat(2, 1fr) ${rem(128)};
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
  font-size: ${rem(12)};
  opacity: 0.4;
  align-self: end;
`;

const DateInfo = styled.span`
  align-self: start;
  font-size: ${rem(20)};
  font-weight: 300;
  font-family: 'Raleway', sans-serif;
`;

const DeleteIcon = styled(animated.span)`
  grid-row: span 2;
  font-size: ${rem(48)};
  display: grid;
  align-content: center;
  justify-content: center;
`;

const DeleteFill = styled.svg`
  position: absolute;
  ${position('absolute', 0, 0)};
  ${size('100%')};
  z-index: -1;
  border-radius: inherit;
`;

const NewUserLink = styled(ButtonLink)`
  grid-column: 2 / span 1;
`;

function getAvatar(profile: Users_users_profile) {
  if (profile.avatar) {
    return profile.avatar.url;
  }

  return '';
}

const getListItemStyles = (on: boolean) => {
  return on
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
};

const redFill = {
  off: {
    d: 'M100,0 L100,100, L100,100, L100,0 Z',
    fill: 'hsla(212, 50%, 50%, 0)',
  },
  on: {
    d: 'M100,0 M100,100, 20,100, 22,0 Z',
    fill: 'hsla(0, 50%, 50%, 0.4)',
  },
};

type ListItemStyles = ReturnType<typeof getListItemStyles>;

interface DeleteUserProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteUserAlert({ onConfirm, onCancel }: DeleteUserProps) {
  return (
    <Confirm
      title="Are you sure you want to do this?"
      message="You are about to permanently delete this user"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

interface DeleteUserButtonProps {
  user: Users_users;
  setDeleteOn: () => void;
  setDeleteOff: () => void;
}

function DeleteUserButton({
  user,
  setDeleteOn,
  setDeleteOff,
}: DeleteUserButtonProps) {
  return (
    <Mutation<DeleteUserMutation, DeleteUserMutationVariables>
      mutation={DELETE_USER_MUTATION}
      variables={{
        where: { id: user.id },
      }}
    >
      {mutate => (
        <PortalManager.Consumer>
          {({ setPortalNode }) => (
            <DeleteIcon
              onMouseEnter={setDeleteOn}
              onMouseLeave={setDeleteOff}
              onClick={event => {
                event.preventDefault();
                setPortalNode(
                  <DeleteUserAlert
                    onConfirm={() => {
                      deleteUser(mutate);
                      setPortalNode(null);
                    }}
                    onCancel={() => setPortalNode(null)}
                  />,
                );
              }}
            >
              <AnimatedCross />
            </DeleteIcon>
          )}
        </PortalManager.Consumer>
      )}
    </Mutation>
  );
}

interface UserListItemProps {
  user: Users_users;
  isCurrentUser: boolean;
  baseUrl: string;
}

function UserListItem({ baseUrl, user, isCurrentUser }: UserListItemProps) {
  const avatar = getAvatar(user.profile);
  return (
    <Toggle>
      {({ on, setOn, setOff }) => {
        return (
          <Spring<{}, ListItemStyles> native to={getListItemStyles(on)}>
            {styles => (
              <UserListItemContainer
                onMouseEnter={setOn}
                onMouseLeave={setOff}
                style={styles}
              >
                <Toggle>
                  {({
                    on: deleteOn,
                    setOn: setDeleteOn,
                    setOff: setDeleteOff,
                  }) => (
                    <>
                      <DeleteFill
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                      >
                        <Spring native to={deleteOn ? redFill.on : redFill.off}>
                          {({ d, fill }) => {
                            return <animated.path fill={fill} d={d} />;
                          }}
                        </Spring>
                      </DeleteFill>
                      <UserLink to={`${baseUrl}/${user.id}`}>
                        <UserAvatar
                          style={{
                            boxShadow: styles.boxShadow,
                            transform: styles.transform,
                          }}
                          src={avatar}
                          size={96}
                        />
                        <UserName>
                          {user.profile.firstName} {user.profile.lastName}
                        </UserName>
                        <UserEmail>{user.email}</UserEmail>
                        <Label>Last login</Label>
                        <DateInfo>{getTimeAgo(user.lastLogin)}</DateInfo>
                        <Label>Created</Label>
                        <DateInfo>{getFormattedDate(user.createdAt)}</DateInfo>
                        {on &&
                          !isCurrentUser && (
                            <DeleteUserButton
                              user={user}
                              setDeleteOn={setDeleteOn}
                              setDeleteOff={setDeleteOff}
                            />
                          )}
                      </UserLink>
                    </>
                  )}
                </Toggle>
              </UserListItemContainer>
            )}
          </Spring>
        );
      }}
    </Toggle>
  );
}

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

function AdminUsers({ className, match }: Props) {
  return (
    <UsersLayout className={className}>
      <UsersHeading>Users</UsersHeading>
      <NewUserLink to={`${match.url}/new`}>New user</NewUserLink>
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
                const isCurrentUser =
                  (data.session && data.session.user.id === user.id) || false;
                return (
                  <UserListItem
                    key={user.id}
                    user={user}
                    baseUrl={match.url}
                    isCurrentUser={isCurrentUser}
                  />
                );
              })}
            </UserList>
          );
        }}
      </Query>
    </UsersLayout>
  );
}

export default hot(module)(AdminUsers);
