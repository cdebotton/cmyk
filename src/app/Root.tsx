import React, { Placeholder } from 'react';
import { hot } from 'react-hot-loader';
import Heading from './components/Heading';

function Root() {
  return (
    <div>
      <Heading level={1}>👋🏻 🌎!</Heading>
    </div>
  );
}

export default hot(module)(Root);
