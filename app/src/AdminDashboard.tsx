import React from 'react';
import { RouteComponentProps } from 'react-router';
import ListLayout, { Heading } from './components/ListLayout';
import Title from './containers/Title';

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

function Dashboard({ className }: Props) {
  return (
    <ListLayout className={className}>
      <Title>Dashboard | Admin</Title>
      <Heading>Dashboard</Heading>
    </ListLayout>
  );
}

export default Dashboard;
