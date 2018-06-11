import React, { SFC } from 'react';
import { Query, QueryResult, Mutation, MutationUpdaterFn } from 'react-apollo';
import Loadable from 'react-loadable';
import gql from 'graphql-tag';
import Heading from './components/atoms/Heading';
import PageLoader from './components/molecules/PageLoader';
import AdminCreateUser from './AdminCreateUser';
import { RouteComponentProps } from 'react-router-dom';
import SessionContext from './containers/SessionContext';
import Page from './components/atoms/Page';
import List from './components/molecules/List';
import UserLabel from './components/molecules/UserLabel';
import UserDescription from './components/molecules/UserDescription';

const AdminEditUser = Loadable({
  loader: () => import('./AdminEditUser'),
  loading: () => <PageLoader />,
});

const getUsersQuery = gql`
  query GetUsers {
    users {
      id
      email
      role
      profile {
        firstName
        lastName
      }
      lastLogin
    }
  }
`;

const deleteUserMutation = gql`
  mutation DeleteUser($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      id
    }
  }
`;

type User = {
  id: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'USER' | 'UNAUTHORIZED';
  profile: {
    firstName: string;
    lastName: string;
  };
  lastLogin: string | null;
};

type Response = {
  users: User[];
};

type Props = RouteComponentProps<{}> & {};

const AdminUsers: SFC<Props> = ({ match }) => (
  <Page>
    <Heading>Users</Heading>
    {/* <AdminCreateUser /> */}
    <Query query={getUsersQuery}>
      {({ data, error }: QueryResult<Response>) => {
        if (error) {
          return null;
        }

        if (!data || !data.users) {
          return <PageLoader />;
        }

        return (
          <List
            items={data.users}
            label={(user: User) => (
              <UserLabel to={`${match.url}/${user.id}`} user={user} />
            )}
            description={(user: User) => (
              <SessionContext.Consumer>
                {({ session }) => (
                  <Mutation
                    mutation={deleteUserMutation}
                    update={updateOnDelete}
                  >
                    {deleteUser => (
                      <UserDescription
                        isCurrentUser={session && session.id === user.id}
                        user={user}
                        deleteUser={deleteUser}
                      />
                    )}
                  </Mutation>
                )}
              </SessionContext.Consumer>
            )}
          />
        );
      }}
    </Query>
  </Page>
);

type DeleteUserResponse = {
  deleteUser: {
    id: string;
  };
};

const updateOnDelete: MutationUpdaterFn<DeleteUserResponse> = (
  cache,
  result,
) => {
  if (!result.data) {
    return;
  }

  const cacheResult = cache.readQuery<Response>({
    query: getUsersQuery,
  });

  if (!cacheResult) {
    return;
  }

  const removedId = result.data.deleteUser.id;

  cache.writeQuery({
    query: getUsersQuery,
    data: {
      users: cacheResult.users.filter(user => user.id !== removedId),
    },
  });
};

export default AdminUsers;
