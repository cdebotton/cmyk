import React from 'react';
import styled from 'styled-components';
import { CssHelperFn } from '../../theme';
import colors from '../../theme/colors';
import Grid from '../atoms/Grid';

const getBackgroundColor: CssHelperFn = props => {
  if (!props.theme || props.theme.mode === 'light') {
    return colors.whites[0];
  }

  return colors.blacks[0];
};

const getColor: CssHelperFn = props => {
  if (!props.theme || props.theme.mode === 'light') {
    return colors.blacks[0];
  }

  return colors.whites[0];
};

const BaseLayout = Grid.extend`
  position: relative;
  overflow: auto;
  width: 100vw;
  min-height: 100vh;
  background-color: ${getBackgroundColor};
  color: ${getColor};
`;

export default BaseLayout;
