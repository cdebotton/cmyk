import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import Heading from './components/Heading';
import Loader from './components/Loader';

const USERS_QUERY = gql`
  query Users {
    users {
      id
    }
  }
`;

interface IProps {
  className?: string;
}

function AdminUsers({ className }: IProps) {
  return (
    <div className={className}>
      <Heading>Users</Heading>
      <Query<{}, {}> query={USERS_QUERY}>
        {({ data, loading, error }) => {
          if (error) {
            return null;
          }

          if (loading) {
            return <Loader />;
          }
        }}
      </Query>
    </div>
  );
}

export default hot(module)(styled(AdminUsers)`
  position: relative;
`);
