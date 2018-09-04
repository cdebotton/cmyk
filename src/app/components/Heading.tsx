import { modularScale } from 'polished';
import React, { HTMLProps, ReactNode } from 'react';
import styled from 'styled-components';

interface IProps extends HTMLProps<HTMLHeadingElement> {
  level?: number;
  vertical?: boolean;
  children?: ReactNode;
}

function Heading({
  level = 2,
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

function fontSize(props: IProps) {
  let size: string;

  switch (props.level) {
    case 1:
      size = modularScale(2.5);
      break;
    case 2:
      size = modularScale(3);
    case 3:
      size = modularScale(2);
    case 2:
      size = modularScale(1);
    default:
      size = modularScale(0);
      break;
  }

  return `font-size: ${size}`;
}

export default styled(Heading)`
  position: relative;
  margin: 0;
  padding: 0;
  font-family: Oswald, sans-serif;
  ${writingMode};
  ${fontSize};
`;
