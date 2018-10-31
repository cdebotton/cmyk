import gql from 'graphql-tag';
import { position, rem, size } from 'polished';
import React, { useContext, useEffect, useState } from 'react';
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
import Layout from './components/Layout';
import List from './components/List';
import PageHeading from './components/PageHeading';
import Tooltip from './components/Tooltip';
import PortalContext from './containers/PortalContext';
import { useApolloMutation, useApolloQuery } from './hooks/Apollo';
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

const DeleteIcon = styled(animated.span)`
  grid-row: span 2;
  font-size: ${rem(48)};
  display: grid;
  align-content: center;
  justify-content: center;
`;

function getAvatar(profile: Users_users_profile) {
  if (profile.avatar) {
    return profile.avatar.url;
  }

  return '';
}

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

function AnimatedDeleteBar(props: { on: boolean }) {
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

  useEffect(
    () => {
      if (props.on) {
        setDeleteStyles(deleteStates.focus);
      } else {
        setDeleteStyles(deleteStates.blur);
      }
    },
    [props.on],
  );

  return <animated.path fill={fill} d={d} />;
}

function AdminUserItem({
  user,
  isCurrentUser,
  baseUrl,
}: {
  user: Users_users;
  isCurrentUser: boolean;
  baseUrl: string;
}) {
  const [hoverList, setHoverList] = useState(false);
  const [hoverDelete, setHoverDelete] = useState(false);
  const itemStates = {
    blur: {
      backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
      boxShadow: '0px 0px 10px hsla(0, 0%, 0%, 0.1)',
      config: config.default,
      transform: 'translate3d(0, 0, 0px)',
    },
    focus: {
      backgroundColor: 'hsla(0, 0%, 100%, 0.225)',
      boxShadow: '0px 10px 40px hsla(0, 0%, 0%, 0.4)',
      transform: 'translate3d(0, 0, 20px)',
    },
  };

  const [listStyles, setListStyles] = useSpring({
    ...itemStates.blur,
    config: config.default,
  });

  useEffect(
    () => {
      if (hoverList) {
        setListStyles(itemStates.focus);
      } else {
        setListStyles(itemStates.blur);
      }
    },
    [hoverList],
  );

  const avatar = getAvatar(user.profile);
  const { setPortalNode } = useContext(PortalContext);
  const mutate = useApolloMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(DELETE_USER_MUTATION, {
    variables: { where: { id: user.id } },

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

  return (
    <span
      onMouseEnter={() => setHoverList(true)}
      onMouseLeave={() => setHoverList(false)}
    >
      <DeleteFill preserveAspectRatio="none" viewBox="0 0 100 100">
        <AnimatedDeleteBar on={hoverDelete} />
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
            <DeleteIcon
              onMouseEnter={() => setHoverDelete(true)}
              onMouseLeave={() => setHoverDelete(false)}
              onClick={event => {
                event.preventDefault();
                setPortalNode(
                  <Confirm
                    title="Are you sure you want to do this?"
                    message="You are about to permanently delete this user"
                    onConfirm={() => {
                      mutate();
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
      </UserLink>
    </span>
  );
}

const gutter = `minmax(${rem(16)}, auto)`;

const UserLayout = styled(Layout)`
  grid-gap: ${rem(16)};
  grid-template-columns: ${gutter} minmax(auto, ${rem(1680)}) ${gutter};
  align-content: start;
`;

const UsersHeading = styled(PageHeading)`
  grid-column: 2 / span 1;
`;

const NewUserLink = styled(ButtonLink)`
  grid-column: 2 / span 1;
  justify-self: start;
`;

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

function AdminUsers({ className, match }: Props) {
  const {
    data: { users, session },
  } = useApolloQuery<Users>(USERS_QUERY);

  return (
    <UserLayout className={className}>
      <UsersHeading>Users</UsersHeading>
      <NewUserLink to={`${match.url}/new`}>New user</NewUserLink>
      <List
        items={users}
        getItemKey={user => `USER_LIST_ITEM${user.id}`}
        render={user => (
          <AdminUserItem
            key={`ADMIN_USER_ITEM_${user.id}`}
            baseUrl={match.url}
            isCurrentUser={
              (session && session.user && session.user.id === user.id) || false
            }
            user={user}
          />
        )}
      />
    </UserLayout>
  );
}

export default AdminUsers;
