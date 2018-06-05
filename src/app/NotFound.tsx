import React, { SFC } from 'react';
import Status from './containers/Status';
import Heading from './components/atoms/Heading';

const NotFound: SFC = () => (
  <Status statusCode={404}>
    <Heading>Not found</Heading>
  </Status>
);

export default NotFound;
