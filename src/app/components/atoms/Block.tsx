import React, { createElement, SFC, ComponentType } from 'react';
import styled from 'styled-components';
import { CssHelperFn } from '../../theme';
import colors from '../../theme/colors';
import { EPROTONOSUPPORT } from 'constants';

interface Props {
  className?: string;
  row?: string;
  column?: string;
  component?: ComponentType<any> | string;
  format?: 'positive' | 'neutral' | 'negative';
  bgShade?: number;
  fgShade?: number;
}

const Block: SFC<Props> = ({
  component = 'div',
  row: _0,
  column: _1,
  format: _2,
  bgShade: _3,
  fgShade: _4,
  ...props
}) => {
  return createElement(component, props);
};

const getRow: CssHelperFn<Props> = props => {
  if (props.row) {
    return props.row;
  }

  return '';
};

const getColumn: CssHelperFn<Props> = props => {
  if (props.column) {
    return props.column;
  }

  return '';
};

const getBackground: CssHelperFn<Props> = ({
  format,
  bgShade,
  theme = { mode: 'light' },
}) => {
  if (format && bgShade) {
    return colors[format][bgShade];
  } else if (format) {
    return `linear-gradient(to bottom right, ${colors[format].join(',')})`;
  }

  const { mode } = theme;

  return colors[mode === 'light' ? 'whites' : 'blacks'][bgShade || 0];
};

const getColor: CssHelperFn<Props> = ({
  format,
  theme = { mode: 'light' },
  fgShade = 0,
}) => {
  const { mode } = theme;

  const colorPalette = format || mode === 'dark' ? 'whites' : 'blacks';

  return colors[colorPalette][fgShade];
};

export default styled(Block)`
  position: relative;
  background: ${getBackground};
  color: ${getColor};
  grid-column: ${getColumn};
  grid-row: ${getRow};
`;
