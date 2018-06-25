import React, { SFC, Fragment } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps, Switch, Route } from 'react-router';
import universal from 'react-universal-component';
import styled, { ThemeProvider } from 'styled-components';

import { GetSession } from './generated/operation-result-types';
import { GET_SESSION_QUERY } from './queries';
import BaseLayout from './components/layouts/BaseLayout';
import Block from './components/atoms/Block';
import Heading from './components/atoms/Heading';
import Button from './components/molecules/Button';

const NotFound = universal(import('./NotFound'));

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
          <BaseLayout templateColumns="min-content auto">
            <Block bgShade={1}>
              <Heading vertical level={1}>
                CMYK
              </Heading>
              <Button format="neutral">Logout</Button>
            </Block>
            <Switch>
              <Route component={NotFound} />
            </Switch>
          </BaseLayout>
        </ThemeProvider>
      );
    }}
  </Query>
);

export default Admin;
