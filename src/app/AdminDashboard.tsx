import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import Heading from './components/Heading';

function Dashboard() {
  return (
    <>
      <Heading>Dashboard</Heading>
    </>
  );
}

export default hot(module)(styled(Dashboard)`
  position: relative;
`);
