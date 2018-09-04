import React from 'react';
import styled from 'styled-components';
import Heading from './components/Heading';

interface IProps {
  className?: string;
}

function Admin({ className }: IProps) {
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
