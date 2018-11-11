import React from 'react';
import { RouteComponentProps } from 'react-router';
import ListLayout, { Heading } from './components/ListLayout';

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

function Dashboard({ className }: Props) {
  return (
    <ListLayout className={className}>
      <Heading>Dashboard</Heading>
    </ListLayout>
  );
}

export default Dashboard;
