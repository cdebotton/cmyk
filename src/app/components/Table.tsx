import { margin, padding, rem } from 'polished';
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
  grid-gap: ${rem(16)};
  background-image: linear-gradient(
    to bottom,
    hsla(0, 0%, 0%, 0.41),
    hsla(0, 0%, 0%, 0.32)
  );
`;

const TableControls = styled.div`
  background-color: #0a0a0a;
  width: ${rem(256)};
  border-radius: 3px;
  height: calc(100% + ${rem(16)});
  margin-top: ${rem(-8)};
  margin-left: ${rem(-8)};
  ${padding(rem(32), rem(16))};
`;

const TableList = styled.ul`
  display: grid;
  grid-template-columns: auto;
  grid-gap: ${rem(16)};
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
