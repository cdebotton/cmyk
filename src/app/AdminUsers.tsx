import gql from 'graphql-tag';
import { rem } from 'polished';
import React from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Users } from './__generated__/Users';
import Button from './components/Button';
import Heading from './components/Heading';
import List, { Item } from './components/List';
import Loader from './components/Loader';
import PageLayout from './components/PageLayout';
import DynamicRoute from './containers/DynamicRoute';
import { foreground, gradient } from './styles/helpers';

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
    <AdminUsersLayout className={className}>
      <Header format="neutral">
        <Heading>Users</Heading>
        <Button format="neutral">New user</Button>
      </Header>
      <Query<Users, {}> query={USERS_QUERY}>
        {({ data, loading, error }) => {
          if (error) {
            return null;
          }

          if (loading || !data) {
            return <Loader />;
          }

          return (
            <UsersList>
              {data.users.map(user => (
                <User key={user.id}>
                  <ClickableArea to={`${match.url}/${user.id}`}>
                    <Email>{user.email}</Email>
                    <Name>
                      {user.profile.firstName} {user.profile.lastName}
                    </Name>
                  </ClickableArea>
                </User>
              ))}
            </UsersList>
          );
        }}
      </Query>
      <DynamicRoute
        path={`${match.url}/:userId`}
        loader={() => import('./AdminEditUser')}
      />
    </AdminUsersLayout>
  );
}

const AdminUsersLayout = styled(PageLayout)`
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
`;

const Header = styled.header`
  grid-column: 1 / span 4;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
  padding-bottom: ${rem(8)};
  margin-bottom: ${rem(8)};

  &::after {
    position: absolute;
    display: block;
    content: ' ';
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    ${gradient()};
  }
`;

const User = styled(Item)`
  position: relative;
`;

const UsersList = styled(List)`
  grid-column: 1 / span 4;
`;

const ClickableArea = styled(Link)`
  display: grid;
  grid-gap: ${rem(16)};
  grid-template-columns: min-content max-content;
  align-items: baseline;
  text-decoration: none;
  ${foreground()};
`;
const Email = styled.span``;
const Name = styled.span``;

export default hot(module)(AdminUsers);
