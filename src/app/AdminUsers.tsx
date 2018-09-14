import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';
import parse from 'date-fns/parse';
import gql from 'graphql-tag';
import { rem } from 'polished';
import React from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Users } from './__generated__/Users';
import Badge from './components/Badge';
import Button from './components/Button';
import Card from './components/Card';
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
      role
      lastLogin
      createdAt
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
      <AdminUserFilters format="neutral" />
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
            <>
              <UsersList>
                {data.users.map(user => (
                  <Item key={user.id}>
                    <ClickableArea to={`${match.url}/${user.id}`}>
                      <Card
                        imageUrl="http://placeimg.com/128/128/any"
                        title={
                          <>
                            {user.profile.firstName} {user.profile.lastName}
                          </>
                        }
                        subtitle={user.email}
                        badge={<Badge format="neutral">{user.role}</Badge>}
                      />
                      <span>{getFormattedDate(user.createdAt)}</span>
                      <span>{getTimeAgo(user.lastLogin)}</span>
                    </ClickableArea>
                  </Item>
                ))}
              </UsersList>
              <DynamicRoute
                path={`${match.url}/:userId`}
                loader={() => import('./AdminEditUser')}
                renderComponent={(Component, routeProps) => (
                  <EditUserContainer>
                    <Component {...routeProps} />
                  </EditUserContainer>
                )}
              />
            </>
          );
        }}
      </Query>
    </AdminUsersLayout>
  );
}

const AdminUsersLayout = styled(PageLayout)`
  width: 100%;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: min-content auto;
  min-height: 100vh;
  align-content: stretch;
`;

const Header = styled.header`
  grid-column: 1 / span 8;
  grid-row: 1 / span 1;
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

const AdminUserFilters = styled.nav`
  grid-column: 1 / span 2;
  grid-row: 2 / span 1;
  border-radius: 3px;
  ${gradient({ offset: 3, steps: 2 })};
`;

const UsersList = styled(List)`
  grid-column: 3 / span 6;
  grid-row: 2 / span 1;
`;

const ClickableArea = styled(Link)`
  display: grid;
  grid-gap: ${rem(16)};
  grid-template-columns: 2fr repeat(3, 1fr);
  align-items: baseline;
  text-decoration: none;
  ${foreground()};
`;

const EditUserContainer = styled.div`
  grid-column: 1 / span 8;
`;

function getFormattedDate(date: string) {
  const parsed = parse(date);
  if (!isValid(parsed)) {
    return null;
  }
  return format(parsed, 'MMMM DD, YYYY');
}

function getTimeAgo(date: string | null) {
  if (date == null) {
    return 'Never';
  }

  const parsed = parse(date);

  return distanceInWordsToNow(parsed);
}

export default hot(module)(AdminUsers);
