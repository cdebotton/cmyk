import gql from 'graphql-tag';

export const GET_SESSION_QUERY = gql`
  query GetSession {
    session {
      id
      email
    }
  }
`;
