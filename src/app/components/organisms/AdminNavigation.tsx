import React, { SFC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  pages: ReactNode;
  actions: ReactNode;
};

const PageContainer = styled.div``;

const ActionsContainer = styled.div``;

const AdminNavigation: SFC<Props> = ({ actions, className, pages }) => (
  <nav className={className}>
    <PageContainer>{pages}</PageContainer>
    <ActionsContainer>{actions}</ActionsContainer>
  </nav>
);

export default styled(AdminNavigation)`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
