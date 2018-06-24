import React, { SFC } from 'react';
import universal from 'react-universal-component';
import { RouteComponentProps } from 'react-router-dom';
import Page from './components/atoms/Page';
import LayeredStepper from './components/molecules/LayeredStepper';

const AdminUsersEdit = universal(import('./AdminUsersEdit'));
const AdminUsersIndex = universal(import('./AdminUsersIndex'));

type Props = RouteComponentProps<{}> & {};

const AdminUsers: SFC<Props> = ({ location: { pathname }, match }) => (
  <Page>
    <LayeredStepper
      pathname={pathname}
      layers={[
        {
          layer: 1,
          path: match.url,
          component: AdminUsersIndex,
        },
        {
          layer: 2,
          path: `${match.url}/:userId`,
          component: AdminUsersEdit,
        },
      ]}
    />
  </Page>
);

export default AdminUsers;
