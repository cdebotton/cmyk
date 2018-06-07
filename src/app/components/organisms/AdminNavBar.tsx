import React, { SFC, ReactNode } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = {
  className?: string;
  pages: ReactNode;
  actions: ReactNode;
};

const PageContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  grid-column: span 1;
  grid-row: span 1;
`;

const ActionsContainer = styled.div`
  display: grid;
  grid-column: span 1;
  grid-row: span 1;
`;

const AdminNavigation: SFC<Props> = ({ actions, className, pages }) => (
  <nav className={className}>
    <PageContainer>{pages}</PageContainer>
    <ActionsContainer>{actions}</ActionsContainer>
  </nav>
);

export default styled(AdminNavigation)`
  position: relative;
  display: grid;
  padding-right: ${rem(20)};
  grid-template-columns: auto min-content;
`;
