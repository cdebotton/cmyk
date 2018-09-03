import React, { ReactNode, HTMLProps } from 'react';
import styled from 'styled-components';

interface Props extends HTMLProps<HTMLHeadingElement> {
  level?: number;
  children?: ReactNode;
}

function Heading({ level = 2, children, ...props }: Props) {
  if (level < 1 || level > 6) {
    throw new Error('<Heading level /> must be between 1 and 6');
  }
  return React.createElement(`h${level}`, props, children);
}

export default styled(Heading)`
  position: relative;
`;
