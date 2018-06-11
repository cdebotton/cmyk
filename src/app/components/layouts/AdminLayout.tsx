import React, { SFC, ReactNode } from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import { rem } from 'polished';
import colors from '../../theme/colors';
import { Theme } from '../../theme';

type Props = {
  className?: string;
  controls: ReactNode;
  content: ReactNode;
};

const AdminLayout: SFC<Props> = ({ className, content, controls }) => (
  <div className={className}>
    {controls}
    {content}
  </div>
);

const getBackgroundColor = (props: ThemedStyledProps<Props, Theme>) => {
  switch (props.theme.mode) {
    case 'dark':
      return colors.palette.dark[2];
    default:
      return '#fff';
  }
};

export default styled(AdminLayout)`
  display: grid;
  overflow: auto;
  width: 100%;
  min-height: 100vh;
  background-color: ${getBackgroundColor};
  grid-template-columns: min-content auto;
`;
