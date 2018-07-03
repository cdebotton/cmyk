import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import Heading from './components/atoms/Heading';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { GetUser } from './generated/operation-result-types';

const GET_USER_QUERY = gql`
  query GetUser($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      role
      profile {
        firstName
        lastName
        dateOfBirth
      }
    }
  }
`;

interface Props extends RouteComponentProps<{ userId: string }> {}

const AdminUsersEdit: SFC<Props> = ({ match }) => (
  <div>
    {console.log(match)}
    <Query
      query={GET_USER_QUERY}
      variables={{ where: { id: match.params.userId } }}
    >
      {({ data, loading, error }: QueryResult<GetUser>) => {
        if (error) {
          return <p>{error.message}</p>;
        }

        if (!data || loading) {
          return <p>Loading...</p>;
        }

        return <pre>{JSON.stringify(data.user, null, 2)}</pre>;
      }}
    </Query>
  </div>
);

export default AdminUsersEdit;
