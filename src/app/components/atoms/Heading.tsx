import React, { SFC, HTMLProps } from 'react';
import styled from 'styled-components';

type Props = { level?: number } & HTMLProps<HTMLHeadingElement>;

const Heading: SFC<Props> = ({ level = 2, ...props }) => {
  if (level < 1 || level > 6) {
    throw new Error('Heading level must be between 1 and 6');
  }

  return React.createElement(`h${level}`, props);
};

export default styled(Heading)``;
