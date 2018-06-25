import React, { createElement, SFC } from 'react';
import styled from 'styled-components';
import { CssHelperFn } from '../../theme';

interface Props {
  className?: string;
  vertical?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: SFC<Props> = ({ level = 2, vertical: _0, ...props }) => {
  return createElement(`h${level}`, props);
};

const getWritingMode: CssHelperFn<Props> = props => {
  if (props.vertical) {
    return 'vertical-lr';
  }

  return 'inherit';
};

export default styled(Heading)`
  position: relative;
  padding: 0;
  margin: 0;
  writing-mode: ${getWritingMode};
`;
