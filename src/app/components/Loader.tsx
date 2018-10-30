import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoaderContainer = styled.span`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function Loader({ className }: Props) {
  return (
    <LoaderContainer className={className}>
      [Loader...]
      <span />
      <span />
      <span />
    </LoaderContainer>
  );
}

export default Loader;
