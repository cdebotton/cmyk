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
import { Users, Users_users } from './__generated__/Users';
import AnimatedCross from './components/AnimatedCross';
import Avatar from './components/Avatar';
import ButtonLink from './components/ButtonLink';
import Confirm from './components/Confirm';
import Layout from './components/Layout';
import List, { Item } from './components/List';
import PageHeading from './components/PageHeading';
import Tooltip from './components/Tooltip';
import PortalContext from './containers/PortalContext';
import { useApolloMutation, useApolloQuery } from './hooks/Apollo';
import useFillToLeft from './hooks/useFillToLeft';
import useZoomAnimation from './hooks/useZoomAnimation';
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

const Label = styled.span<{ isTitle?: boolean }>`
  font-size: ${rem(14)};
  align-self: ${({ isTitle = false }) => (isTitle ? 'end' : 'start')};
  opacity: 0.4;
`;

const UserAvatar = styled(Avatar)`
  position: relative;
  grid-row: span 2;
  border-radius: 9px;
`;

const Info = styled.span`
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
  const { fill, d } = useFillToLeft(props.on, {
    color: 'hsla(5, 50%, 50%, 0.5)',
  });

  return <animated.path fill={fill} d={d} />;
}

function User({
  user,
  isCurrentUser,
  baseUrl,
}: {
  user: Users_users;
  isCurrentUser: boolean;
  baseUrl: string;
}) {
  const [isHoveringList, setIsHoveringList] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const zoom = useZoomAnimation(isHoveringList);

  const avatar = user.profile.avatar ? user.profile.avatar.url : '';
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
    <Item
      onMouseEnter={() => setIsHoveringList(true)}
      onMouseLeave={() => setIsHoveringList(false)}
      style={zoom}
    >
      <DeleteFill preserveAspectRatio="none" viewBox="0 0 100 100">
        <AnimatedDeleteBar on={isHoveringDelete} />
      </DeleteFill>
      <UserLink to={`${baseUrl}/${user.id}`}>
        <UserAvatar
          style={{
            boxShadow: zoom.boxShadow,
            transform: zoom.transform,
          }}
          src={avatar}
          size={96}
        />
        <UserName>
          {user.profile.firstName} {user.profile.lastName}
        </UserName>
        <Label>{user.email}</Label>
        <Label isTitle>Last login</Label>
        <Info>{getTimeAgo(user.lastLogin)}</Info>
        <Label isTitle>Created</Label>
        <Info>{getFormattedDate(user.createdAt)}</Info>
        {isHoveringList &&
          !isCurrentUser && (
            <DeleteIcon
              onMouseEnter={() => setIsHoveringDelete(true)}
              onMouseLeave={() => setIsHoveringDelete(false)}
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
    </Item>
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
      <List>
        {users.map(user => {
          const isCurrentUser =
            session && session.user.id === user.id ? true : false;
          return (
            <User
              key={`USER_${user.id}`}
              user={user}
              baseUrl={match.url}
              isCurrentUser={isCurrentUser}
            />
          );
        })}
      </List>
    </UserLayout>
  );
}

export default AdminUsers;
