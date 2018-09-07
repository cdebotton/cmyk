import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import React, { ReactNode } from 'react';
import { Query } from 'react-apollo';
import { Session as ISession } from '../__generated__/Session';

const SESSION_QUERY = gql`
  query Session {
    session {
      iat
      user {
        id
        email
      }
    }
  }
`;

interface IResult {
  session: ISession | null;
  client: ApolloClient<any>;
}

interface IProps {
  children: (result: IResult) => ReactNode;
}

function Session({ children }: IProps) {
  return (
    <Query query={SESSION_QUERY}>
      {({ data, loading, error, client }) => {
        if (error) {
          return null;
        }

        if (!data || loading) {
          return null;
        }

        return children({ session: data.session, client });
      }}
    </Query>
  );
}

export default Session;
