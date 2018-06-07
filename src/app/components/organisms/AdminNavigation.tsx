import React, { SFC, ReactNode } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = {
  className?: string;
  title: ReactNode;
  pages: ReactNode;
  actions: ReactNode;
};

const TitleContainer = styled.div`
  padding: ${rem(20)} ${rem(10)};
  background-color: hsl(200, 10%, 10%);
  color: hsl(180, 99%, 99%);
  grid-column: span 1;
  grid-row: span 2;
  writing-mode: vertical-lr;
`;

const PageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  grid-column: span 1;
  grid-row: span 1;
`;

const ActionsContainer = styled.div`
  grid-column: span 1;
  grid-row: span 1;
`;

const AdminNavigation: SFC<Props> = ({ actions, className, pages, title }) => (
  <nav className={className}>
    <TitleContainer>{title}</TitleContainer>
    <PageContainer>{pages}</PageContainer>
    <ActionsContainer>{actions}</ActionsContainer>
  </nav>
);

export default styled(AdminNavigation)`
  position: relative;
  display: grid;
  padding-right: ${rem(20)};
  grid-template-columns: min-content min-content;
  grid-template-rows: auto min-content;
`;
