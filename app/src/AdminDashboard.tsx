import React from 'react';
import { RouteComponentProps } from 'react-router';
import ListLayout, { Heading } from './components/ListLayout';
import useTitle from './hooks/useTitle';

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

function Dashboard({ className }: Props) {
  useTitle('Dashboard | Admin');
  return (
    <ListLayout className={className}>
      <Heading>Dashboard</Heading>
    </ListLayout>
  );
}

export default Dashboard;
