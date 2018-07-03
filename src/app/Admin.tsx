import React, { SFC, Fragment } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps, Switch, Route } from 'react-router';
import universal from 'react-universal-component';
import { ThemeProvider } from 'styled-components';

import { GetSession } from './generated/operation-result-types';
import BaseLayout from './components/layouts/BaseLayout';
import Heading from './components/atoms/Heading';
import grid from './styles/grid';
import gridItem from './styles/gridItem';
import Sidebar from './components/organisms/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';
import { theme, Mode, Format } from './styles/theme';
import LinkBlock from './components/atoms/LinkBlock';
import gql from 'graphql-tag';

const NotFound = universal(import('./NotFound'));

const AdminLayout = theme(grid(BaseLayout));
const AdminSidebar = theme(gridItem(Sidebar));

const AdminDashboard = universal(import('./AdminDashboard'));
const AdminDocuments = universal(import('./AdminDocuments'));
const AdminUsers = universal(import('./AdminUsers'));

interface Props extends RouteComponentProps<{}> {}

const GET_SESSION_QUERY = gql`
  query GetSession {
    session {
      id
      email
    }
  }
`;

const Admin: SFC<Props> = ({ match }) => (
  <Query query={GET_SESSION_QUERY}>
    {({ data, error, loading }: QueryResult<GetSession>) => {
      if (error) {
        return <p>Error.</p>;
      }

      if (!data) {
        return <p>Loading</p>;
      }

      const isLoggedIn = data.session !== null;

      return (
        <ThemeProvider theme={{ mode: Mode.Light }}>
          <AdminLayout
            gridTemplateColumns={
              isLoggedIn ? ['min-content', 'auto'] : ['auto']
            }
            shader={[0, 2]}
          >
            {isLoggedIn && (
              <AdminSidebar
                format={Format.Neutral}
                shader={[0, 2]}
                label={
                  <Heading vertical level={1}>
                    CMYK
                  </Heading>
                }
                navigation={
                  <Fragment>
                    <LinkBlock to={match.url}>
                      <FontAwesomeIcon icon={faHome} />
                    </LinkBlock>
                    <LinkBlock to={`${match.url}/documents`}>
                      <FontAwesomeIcon icon={faFile} />
                    </LinkBlock>
                    <LinkBlock to={`${match.url}/users`}>
                      <FontAwesomeIcon icon={faUsers} />
                    </LinkBlock>
                  </Fragment>
                }
              />
            )}
            <Switch>
              <Route exact path={match.url} component={AdminDashboard} />
              <Route
                path={`${match.url}/documents`}
                component={AdminDocuments}
              />
              <Route path={`${match.url}/users`} component={AdminUsers} />
              <Route component={NotFound} />
            </Switch>
          </AdminLayout>
        </ThemeProvider>
      );
    }}
  </Query>
);

export default Admin;
