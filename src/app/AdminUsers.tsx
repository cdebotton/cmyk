import React, { SFC } from 'react';
import { Query, QueryResult, Mutation, MutationUpdaterFn } from 'react-apollo';
import Loadable from 'react-loadable';
import gql from 'graphql-tag';
import Heading from './components/atoms/Heading';
import PageLoader from './components/molecules/PageLoader';
import AdminCreateUser from './AdminCreateUser';
import { NavLink, RouteComponentProps, Route } from 'react-router-dom';
import fromNow from './lib/fromNow';
import SplitLayout from './components/layouts/SplitLayout';

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

type Response = {
  users: {
    id: string;
    email: string;
    role: 'ADMIN' | 'EDITOR' | 'USER' | 'UNAUTHORIZED';
    lastLogin: string | null;
  }[];
};

type Props = RouteComponentProps<{}> & {};

const AdminUsers: SFC<Props> = ({ match }) => (
  <SplitLayout
    left={
      <div>
        <Heading>Users</Heading>
        <AdminCreateUser />
        <Heading level={3}>All users</Heading>
        <Query query={getUsersQuery}>
          {({ data, error }: QueryResult<Response>) => {
            if (error) {
              return null;
            }

            if (!data || !data.users) {
              return <PageLoader />;
            }

            return (
              <ul>
                {data.users.map(user => (
                  <li key={user.id}>
                    <NavLink to={`${match.url}/${user.id}`}>
                      {user.email}
                    </NavLink>{' '}
                    {user.role}
                    {user.lastLogin ? fromNow(user.lastLogin) : 'Never'}
                    <Mutation
                      mutation={deleteUserMutation}
                      update={updateOnDelete}
                    >
                      {mutationFn => (
                        <button
                          onClick={() =>
                            mutationFn({
                              variables: { where: { id: user.id } },
                            })
                          }
                          type="button"
                        >
                          Delete
                        </button>
                      )}
                    </Mutation>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    }
    right={<Route path={`${match.url}/:userId`} component={AdminEditUser} />}
  />
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
