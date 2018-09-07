import React from 'react';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Heading from './components/Heading';

interface IProps extends RouteComponentProps<{ userId: string }> {}

function AdminEditUser({ match }: IProps) {
  return (
    <div>
      <Heading>Edit User {match.params.userId}</Heading>
    </div>
  );
}

export default hot(module)(styled(AdminEditUser)`
  display: grid;
`);
