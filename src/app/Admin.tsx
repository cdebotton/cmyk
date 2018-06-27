import React, { SFC, Fragment } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps, Switch, Route } from 'react-router';
import universal from 'react-universal-component';
import styled, { ThemeProvider } from 'styled-components';

import { GetSession } from './generated/operation-result-types';
import { GET_SESSION_QUERY } from './queries';
import BaseLayout from './components/layouts/BaseLayout';
import Heading from './components/atoms/Heading';
import grid from './styles/grid';
import gridItem from './styles/gridItem';
import Sidebar from './components/organisms/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';

const NotFound = universal(import('./NotFound'));

const AdminLayout = grid(BaseLayout);
const AdminSidebar = gridItem(Sidebar);

interface Props extends RouteComponentProps<{}> {}

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
        <ThemeProvider theme={{ mode: 'light' }}>
          <AdminLayout gridTemplateColumns={['min-content', 'auto']}>
            <AdminSidebar
              label={
                <Heading vertical level={1}>
                  CMYK
                </Heading>
              }
              navigation={
                <Fragment>
                  <FontAwesomeIcon icon={faHome} />
                  <FontAwesomeIcon icon={faFile} />
                  <FontAwesomeIcon icon={faUsers} />
                </Fragment>
              }
            />
            <Switch>
              <Route component={NotFound} />
            </Switch>
          </AdminLayout>
        </ThemeProvider>
      );
    }}
  </Query>
);

export default Admin;
