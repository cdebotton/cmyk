import { margin, opacify, padding, rem } from 'polished';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  children: ReactNode;
  controls?: ReactNode;
}

const TableContainer = styled.div<{ controls?: ReactNode }>`
  display: grid;
  justify-content: stretch;
  align-self: stretch;
  grid-template-columns: ${props =>
    props.controls ? 'min-content auto' : 'auto'};
  width: 100%;
  border-radius: 3px;
  background-color: hsla(0, 0%, 98%, 1);
`;

const TableControls = styled.div`
  display: grid;
  background-color: hsl(0, 0%, 96%);
  width: ${rem(256)};
  border-radius: 3px;
  align-content: start;
  grid-gap: ${rem(32)};
  ${padding(rem(32), rem(16))};
`;

const TableList = styled.ul`
  display: grid;
  grid-template-columns: auto;
  list-style: none;
  align-content: start;
  margin: 0;
  padding: 0;
`;

export const TableRow = styled.li`
  justify-content: stretch;
  ${margin(32)};
`;

export function Table({ className, children, controls }: Props) {
  return (
    <TableContainer className={className} controls={controls}>
      {controls && <TableControls>{controls}</TableControls>}
      <TableList>{children}</TableList>
    </TableContainer>
  );
}
