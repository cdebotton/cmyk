import React, { SFC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  pages: ReactNode;
};

const AdminNavigation: SFC<Props> = ({ className, pages }) => (
  <nav className={className}>{pages}</nav>
);

export default styled(AdminNavigation)`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
`;
