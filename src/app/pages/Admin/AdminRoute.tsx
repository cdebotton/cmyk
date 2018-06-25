import React, { SFC, Fragment } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps, Switch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import universal from 'react-universal-component';
import { ThemeProvider } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faDesktop from '@fortawesome/fontawesome-free-solid/faDesktop';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faImages from '@fortawesome/fontawesome-free-solid/faImages';
import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';

import { GetSession } from '../../generated/operation-result-types';
import { GET_SESSION_QUERY } from './queries';
import AdminLayout from './AdminLayout';
import AdminNavigation from './AdminNavigation';

const NotFound = universal(import('../NotFound'));

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
          <AdminLayout
            navigation={
              <AdminNavigation
                header="CMYK"
                pages={
                  <Fragment>
                    <NavLink to={match.url}>
                      <FontAwesomeIcon icon={faDesktop} />
                    </NavLink>
                    <NavLink to={`${match.url}/media`}>
                      <FontAwesomeIcon icon={faImages} />
                    </NavLink>
                    <NavLink to={`${match.url}/users`}>
                      <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                    <NavLink to={`${match.url}/settings`}>
                      <FontAwesomeIcon icon={faCogs} />
                    </NavLink>
                  </Fragment>
                }
              />
            }
            content={
              <Switch>
                <Route component={NotFound} />
              </Switch>
            }
          />
        </ThemeProvider>
      );
    }}
  </Query>
);

export default Admin;
