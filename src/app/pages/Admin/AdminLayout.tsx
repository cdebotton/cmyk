import React, { SFC } from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import colors from '../../packages/theme/colors';
import { Theme, CssHelperFn } from '../../packages/theme';

interface Props {
  className?: string;
  navigation: JSX.Element;
  content: JSX.Element;
}

const Layout: SFC<Props> = ({ className, content, navigation }) => (
  <div className={className}>
    {navigation}
    {content}
  </div>
);

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

export default styled(Layout)`
  position: relative;
  display: grid;
  width: 100%;
  min-height: 100vh;
  background-color: ${getBackgroundColor};
  color: ${getColor};
  grid-template-columns: min-content auto;
  grid-template-rows: auto;
`;
