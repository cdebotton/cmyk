import React from 'react';
import styled from 'styled-components';
import Heading from './components/Heading';

interface Props {
  className?: string;
}

function Admin({ className }: Props) {
  return (
    <div className={className}>
      <Heading>👋🏻, 🌎!</Heading>
    </div>
  );
}

export default styled(Admin)`
  position: relative;
  display: grid;
`;
