import React, { SFC } from 'react';
import Heading from './components/atoms/Heading';
import { Query, QueryResult, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PageLoader from './components/molecules/PageLoader';
import AdminCreateUser from './AdminCreateUser';

const getUsersQuery = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`;

const deleteUserMutation = gql`
  mutation DeleteUser($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      id
      email
    }
  }
`;

type Response = {
  users: {
    id: string;
    email: string;
  }[];
};

const AdminUsers: SFC = () => (
  <div>
    <Heading>Users</Heading>
    <AdminCreateUser />
    <Heading level={3}>All users</Heading>
    <Query query={getUsersQuery}>
      {({ data, error }: QueryResult<Response>) => {
        if (error) {
          return null;
        }

        if (!data) {
          return <PageLoader />;
        }

        return (
          <ul>
            {data.users.map(user => (
              <li key={user.id}>
                {user.email}
                <Mutation mutation={deleteUserMutation}>
                  {mutationFn => (
                    <button
                      onClick={() =>
                        mutationFn({ variables: { where: { id: user.id } } })
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
);

export default AdminUsers;
