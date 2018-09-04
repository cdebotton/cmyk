import React from 'react';
import styled from 'styled-components';

export enum LoaderSize {
  Small,
  Medium,
  Large,
}

interface IProps {
  className?: string;
  size?: LoaderSize;
}

function Loader({ className, size = LoaderSize.Medium }: IProps) {
  return (
    <span className={className}>
      [Loader...]
      <span />
      <span />
      <span />
    </span>
  );
}

export default styled(Loader)`
  position: relative;
`;
