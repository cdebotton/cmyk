import React, { SFC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = { className?: string; pageLinks: ReactNode; children?: never };

const PageLinks = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const AdminNavigation: SFC<Props> = ({ pageLinks, className }) => (
  <nav className={className}>
    <PageLinks>{pageLinks}</PageLinks>
  </nav>
);

export default styled(AdminNavigation)`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
`;
