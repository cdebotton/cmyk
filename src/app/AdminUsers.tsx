import React, { SFC } from 'react';
import { Query, QueryResult } from 'react-apollo';
import universal from 'react-universal-component';
import gql from 'graphql-tag';
import Heading from './components/atoms/Heading';
import PageLoader from './components/molecules/PageLoader';
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import SessionContext from './containers/SessionContext';
import Page from './components/atoms/Page';
import List from './components/molecules/List';
import UserLabel from './components/molecules/UserLabel';
import SplitLayout from './components/layouts/SplitLayout';

const AdminEditUser = universal(import('./AdminEditUser'));

const getUsersQuery = gql`
  query GetUsers {
    users {
      id
      email
      role
      profile {
        firstName
        lastName
      }
      lastLogin
      createdAt
      updatedAt
    }
  }
`;

type User = {
  id: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'USER' | 'UNAUTHORIZED';
  createdAt: string;
  updatedAt: string;
  profile: {
    firstName: string | null;
    lastName: string | null;
  };
  lastLogin: string | null;
};

type Response = {
  users: User[];
};

type Props = RouteComponentProps<{}> & {};

const AdminUsers: SFC<Props> = ({ match }) => (
  <Page>
    <Heading>Users</Heading>
    <SplitLayout
      left={
        <Query query={getUsersQuery}>
          {({ data, error }: QueryResult<Response>) => {
            if (error) {
              return null;
            }

            if (!data || !data.users) {
              return <PageLoader />;
            }

            return (
              <SessionContext.Consumer>
                {({ session }) => (
                  <List
                    items={data.users}
                    generateKey={props => `USER_${props.id}`}
                    renderItem={(props, index) => {
                      const url = `${match.url}/${props.id}`;
                      const isCurrentUser =
                        session && session.id ? session.id === props.id : false;

                      return (
                        <Route path={url}>
                          {({ match }) => (
                            <Link to={url}>
                              <UserLabel
                                {...props}
                                isEven={index % 2 === 0}
                                isCurrentUser={isCurrentUser}
                                isActive={match !== null}
                              />
                            </Link>
                          )}
                        </Route>
                      );
                    }}
                  />
                )}
              </SessionContext.Consumer>
            );
          }}
        </Query>
      }
      right={<Route path={`${match.url}/:userId`} component={AdminEditUser} />}
    />
  </Page>
);

export default AdminUsers;
