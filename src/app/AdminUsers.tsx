import gql from 'graphql-tag';
import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from './__generated__/DeleteUserMutation';
import { Users } from './__generated__/Users';
import Confirm from './components/Confirm';
import List, { Item } from './components/List';
import ListLayout, { CreateLink, Heading } from './components/ListLayout';
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
  mutation DeleteUserMutation($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

function AdminUsers({ className, match }: Props) {
  const {
    data: { users, session },
  } = useApolloQuery<Users>(USERS_QUERY);

  const { setPortalNode } = useContext(PortalContext);

  const mutate = useApolloMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DELETE_USER_MUTATION,
  );

  const deleteUser = (userId: string) => {
    mutate({
      update: (cache, { data: mutationData }) => {
        const cacheUsers = cache.readQuery<Users>({
          query: USERS_QUERY,
        });

        cache.writeQuery({
          data: {
            users: cacheUsers!.users.filter(u => {
              return u.id !== mutationData!.deleteUser!.id;
            }),
          },
          query: USERS_QUERY,
        });
      },
      variables: { where: { id: userId } },
    });
    setPortalNode(null);
  };

  const onCancel = () => setPortalNode(null);

  return (
    <ListLayout className={className}>
      <Heading>Users</Heading>
      <CreateLink to={`${match.url}/new`}>New user</CreateLink>
      <List hidden={users.length === 0}>
        {users.map(user => {
          const isCurrentUser = session && session.user.id === user.id ? true : false;
          const avatar = user.profile.avatar ? user.profile.avatar.url : '';

          return (
            <Item
              key={`USER_${user.id}`}
              to={`${match.url}/${user.id}`}
              image={avatar}
              label={`${user.profile.firstName} ${user.profile.lastName}`}
              info={user.email}
              onDelete={
                isCurrentUser
                  ? undefined
                  : () => {
                      setPortalNode(
                        <Confirm
                          title="Are you sure you want to do this?"
                          message="You are about to permanently delete this user"
                          onConfirm={() => deleteUser(user.id)}
                          onCancel={() => onCancel()}
                        />,
                      );
                    }
              }
              deleteTooltip={`Delete ${user.email}`}
              details={[
                { label: 'Last login', info: getTimeAgo(user.lastLogin) },
                { label: 'Created', info: getFormattedDate(user.createdAt) },
              ]}
            />
          );
        })}
      </List>
    </ListLayout>
  );
}

export default AdminUsers;
