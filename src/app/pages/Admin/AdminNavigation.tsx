import React, { SFC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CssHelperFn } from '../../packages/theme';
import colors from '../../packages/theme/colors';
import { rem } from 'polished';

interface Props {
  header: ReactNode;
  pages: ReactNode;
  className?: string;
}

const AdminNavigation: SFC<Props> = ({ className, header, pages }) => (
  <nav className={className}>
    <Header>{header}</Header>
    <PageList>{pages}</PageList>
  </nav>
);

const getBackgroundColor: CssHelperFn<Props> = props => {
  if (!props.theme || props.theme.mode === 'light') {
    return colors.whites[1];
  }

  return colors.blacks[1];
};

const getColor: CssHelperFn<Props> = props => {
  if (!props.theme || props.theme.mode === 'light') {
    return colors.blacks[1];
  }

  return colors.whites[1];
};

export default styled(AdminNavigation)`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: ${rem(5)};
  background-color: ${getBackgroundColor};
  color: ${getColor};
`;

const Header = styled.h1`
  position: relative;
  writing-mode: vertical-lr;
`;

const AdminLink = styled(Link)`
  position: relative;
`;

const PageList = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
