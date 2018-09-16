import { rem } from 'polished';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { light } from '../styles/colors';

interface Props {
  className?: string;
  children: ReactNode;
}

export function Table({ className, children }: Props) {
  return (
    <TableContainer className={className}>
      <TableList>{children}</TableList>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  display: grid;
  justify-content: stretch;
  width: 100%;
`;

const TableList = styled.ul`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: ${rem(16)};
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const TableRow = styled.li`
  justify-content: stretch;
  border-bottom: 1px solid ${light[2]};
  padding-bottom: ${rem(16)};
`;
