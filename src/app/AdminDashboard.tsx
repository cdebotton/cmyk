import React from 'react';
import { hot } from 'react-hot-loader';
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

export default hot(module)(styled(Dashboard)`
  position: relative;
`);
