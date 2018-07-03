import React, { SFC } from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { GetUsers } from './generated/operation-result-types';
import { NavLink, RouteComponentProps, Route } from 'react-router-dom';
import Heading from './components/atoms/Heading';
import grid from './styles/grid';
import Block from './components/atoms/Block';
import universal from 'react-universal-component';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`;

const AdminUsersEdit = universal(import('./AdminUsersEdit'));

interface Props extends RouteComponentProps<{}> {}

const Page = grid(Block);

const AdminUsers: SFC<Props> = ({ match }) => (
  <Page gridTemplateColumns={['min-content', '1fr', '1fr']}>
    <Heading vertical>Users</Heading>
    <Query query={GET_USERS}>
      {({ data, error, loading }: QueryResult<GetUsers>) => {
        if (error) {
          return <p>{error.message}</p>;
        }

        if (!data || loading) {
          return <p>Loading...</p>;
        }

        return (
          <ul>
            {data.users.map(user => (
              <li key={user.id}>
                <NavLink to={`${match.url}/${user.id}`}>{user.email}</NavLink>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
    <Route path={`${match.url}/:userId`} component={AdminUsersEdit} />
  </Page>
);

export default AdminUsers;
