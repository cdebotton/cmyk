import gql from 'graphql-tag';
import { padding, position, rem, size } from 'polished';
import React, { useContext, useEffect, useState } from 'react';
import { Mutation, MutationFn, Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from './__generated__/DeleteUserMutation';
import { Users, Users_users, Users_users_profile } from './__generated__/Users';
import AnimatedCross from './components/AnimatedCross';
import Avatar from './components/Avatar';
import ButtonLink from './components/ButtonLink';
import Confirm from './components/Confirm';
import InsetLayout from './components/InsetLayout';
import Loader from './components/Loader';
import PageHeading from './components/PageHeading';
import Tooltip from './components/Tooltip';
import PortalContext from './containers/PortalContext';
import { getFormattedDate, getTimeAgo } from './utils/date';

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

const DeleteIcon = styled(animated.span)`
  grid-row: span 2;
  font-size: ${rem(48)};
  display: grid;
  align-content: center;
  justify-content: center;
`;

function DeleteUserButton(props: {
  user: Users_users;
  setDeleteOn: () => void;
  setDeleteOff: () => void;
}) {
  const { user, setDeleteOn, setDeleteOff } = props;
  const { setPortalNode } = useContext(PortalContext);

  return (
    <Mutation<DeleteUserMutation, DeleteUserMutationVariables>
      mutation={DELETE_USER_MUTATION}
      variables={{
        where: { id: user.id },
      }}
    >
      {mutate => (
        <DeleteIcon
          onMouseEnter={setDeleteOn}
          onMouseLeave={setDeleteOff}
          onClick={event => {
            event.preventDefault();
            setPortalNode(
              <Confirm
                title="Are you sure you want to do this?"
                message="You are about to permanently delete this user"
                onConfirm={() => {
                  deleteUser(mutate);
                  setPortalNode(null);
                }}
                onCancel={() => setPortalNode(null)}
              />,
            );
          }}
        >
          <Tooltip content={`Delete ${user.email}`}>
            <AnimatedCross />
          </Tooltip>
        </DeleteIcon>
      )}
    </Mutation>
  );
}

function getAvatar(profile: Users_users_profile) {
  if (profile.avatar) {
    return profile.avatar.url;
  }

  return '';
}

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

const DeleteFill = styled.svg`
  position: absolute;
  border-radius: inherit;
  z-index: -1;
  ${position('absolute', 0, 0)};
  ${size('100%')};
`;

function UserListItem(props: {
  user: Users_users;
  isCurrentUser: boolean;
  baseUrl: string;
}) {
  const [hoverList, setHoverList] = useState(false);
  const [hoverDelete, setHoverDelete] = useState(false);
  const { baseUrl, user, isCurrentUser } = props;

  const itemStates = {
    blur: {
      backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
      boxShadow: '0px 0px 10px hsla(0, 0%, 0%, 0.1)',
      config: config.default,
      transform: 'translate3d(0, 0, 0px)',
    },
    focus: {
      backgroundColor: 'hsla(0, 0%, 100%, 0.175)',
      boxShadow: '0px 10px 40px hsla(0, 0%, 0%, 0.4)',
      transform: 'translate3d(0, 0, 20px)',
    },
  };

  const [listStyles, setListStyles] = useSpring({
    ...itemStates.blur,
    config: config.default,
  });

  const deleteStates = {
    blur: {
      d: 'M100,0 L100,100, L100,100, L100,0 Z',
      fill: 'hsla(212, 50%, 50%, 0)',
    },
    disabled: {
      d: 'M100,0 L100,100, L100,100, L100,0 Z',
      fill: 'hsla(212, 50%, 50%, 0)',
    },
    focus: {
      d: 'M100,0 M100,100, 20,100, 22,0 Z',
      fill: 'hsla(5, 50%, 50%, 0.5)',
    },
  };

  const [{ d, fill }, setDeleteStyles] = useSpring({
    config: config.default,
    ...deleteStates.disabled,
  });

  useEffect(() => {
    if (hoverList) {
      setListStyles(itemStates.focus);
    } else {
      setListStyles(itemStates.blur);
    }

    if (hoverDelete) {
      setDeleteStyles(deleteStates.focus);
    } else {
      setDeleteStyles(deleteStates.blur);
    }
  });

  const avatar = getAvatar(user.profile);
  return (
    <UserListItemContainer
      onMouseEnter={() => setHoverList(true)}
      onMouseLeave={() => setHoverList(false)}
      style={listStyles}
    >
      <DeleteFill preserveAspectRatio="none" viewBox="0 0 100 100">
        <animated.path fill={fill} d={d} />;
      </DeleteFill>
      <UserLink to={`${baseUrl}/${user.id}`}>
        <UserAvatar
          style={{
            boxShadow: listStyles.boxShadow,
            transform: listStyles.transform,
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
        {hoverList &&
          !isCurrentUser && (
            <DeleteUserButton
              user={user}
              setDeleteOn={() => setHoverDelete(true)}
              setDeleteOff={() => setHoverDelete(false)}
            />
          )}
      </UserLink>
    </UserListItemContainer>
  );
}

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

const NewUserLink = styled(ButtonLink)`
  grid-column: 2 / span 1;
  justify-self: start;
`;

function AdminUsers(props: { className?: string } & RouteComponentProps<void>) {
  const { className, match } = props;
  return (
    <InsetLayout className={className}>
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
    </InsetLayout>
  );
}

export default AdminUsers;
