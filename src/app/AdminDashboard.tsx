import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Heading from './components/Heading';
import PageLayout from './components/PageLayout';

interface IProps extends RouteComponentProps<{}> {
  className?: string;
}

function Dashboard({ className }: IProps) {
  return (
    <PageLayout className={className}>
      <Heading>Dashboard</Heading>
    </PageLayout>
  );
}

export default styled(Dashboard)`
  position: relative;
`;
