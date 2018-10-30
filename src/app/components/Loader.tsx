import React from 'react';
import styled from 'styled-components';

export enum LoaderSize {
  Small,
  Medium,
  Large,
}

interface Props {
  className?: string;
  size?: LoaderSize;
}

const LoaderContainer = styled.span``;

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
