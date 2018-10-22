import { padding, rem } from 'polished';
import React, { HTMLProps, ReactNode } from 'react';
import styled from 'styled-components';

interface IProps extends HTMLProps<HTMLHeadingElement> {
  level?: number;
  vertical?: boolean;
  children?: ReactNode;
}

function modularScale(steps: number) {
  return rem(16 * 1.414 ** steps);
}

const DEFAULT_LEVEL = 2;

function Heading({
  level = DEFAULT_LEVEL,
  children,
  vertical: _vertical,
  ...props
}: IProps) {
  if (level < 1 || level > 6) {
    throw new Error('<Heading level /> must be between 1 and 6');
  }
  return React.createElement(`h${level}`, props, children);
}

function writingMode(props: IProps) {
  if (props.vertical) {
    return 'writing-mode: vertical-rl';
  }

  return null;
}

function fontSize({ level = DEFAULT_LEVEL }: IProps) {
  let size: string;

  switch (level) {
    case 1:
      size = modularScale(3);
      break;
    case 2:
      size = rem(48);
      break;
    case 3:
      size = modularScale(3);
      break;
    case 2:
      size = modularScale(2);
      break;
    default:
      size = modularScale(1);
      break;
  }

  return `font-size: ${size}`;
}

export default styled(Heading)`
  position: relative;
  justify-self: start;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-family: 'Raleway', sans-serif;
  color: #000;
  background-color: #fff;
  ${padding(rem(8))};
  ${writingMode};
  ${fontSize};
`;
