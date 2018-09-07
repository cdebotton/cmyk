import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Users } from './__generated__/Users';
import Heading from './components/Heading';
import List, { Item } from './components/List';
import Loader from './components/Loader';

const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`;

interface IProps extends RouteComponentProps<{}> {
  className?: string;
}

function AdminUsers({ className, match }: IProps) {
  return (
    <div className={className}>
      <Heading>Users</Heading>
      <Query<Users, {}> query={USERS_QUERY}>
        {({ data, loading, error }) => {
          if (error) {
            return null;
          }

          if (loading || !data) {
            return <Loader />;
          }

          return (
            <List>
              {data.users.map(user => (
                <Item key={user.id}>
                  <Link to={`${match.url}/${user.id}`}>{user.email}</Link>
                </Item>
              ))}
            </List>
          );
        }}
      </Query>
    </div>
  );
}

export default hot(module)(styled(AdminUsers)`
  position: relative;
`);
