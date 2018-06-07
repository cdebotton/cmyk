import React, { SFC, ReactNode } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = {
  className?: string;
  title: ReactNode;
  navigation: ReactNode;
  content: ReactNode;
};

const AdminLayout: SFC<Props> = ({ className, content, navigation, title }) => (
  <div className={className}>
    {title}
    {navigation}
    {content}
  </div>
);

export default styled(AdminLayout)`
  display: grid;
  overflow: auto;
  width: 100%;
  min-height: 100vh;
  grid-template-columns: min-content auto;
  grid-template-rows: min-content auto;

  & > *:nth-child(1) {
    padding: ${rem(10)} ${rem(10)};
    background-color: hsl(200, 10%, 10%);
    color: hsl(240, 99%, 99%);
    grid-column: span 1;
    grid-row: span 2;
    writing-mode: vertical-lr;
  }

  & > *:nth-child(2) {
    padding: ${rem(10)};
    background-color: hsl(200, 10%, 10%);
    color: hsl(240, 99%, 99%);
    grid-column: 2 / span 1;
    grid-row: span 1;
  }

  & > *:nth-child(3) {
    padding: ${rem(10)};
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }
`;
