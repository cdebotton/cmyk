import React, { ReactNode, SFC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Node = { id: any };

type Props = {
  className?: string;
  keyProp?: string;
  keyPrefix?: string;
  items: any[];
  listItem: (item: any) => ReactNode;
  children?: never;
};

const List: SFC<Props> = ({
  className,
  items,
  listItem,
  keyProp = 'id',
  keyPrefix = 'LIST_ITEM_',
}) => (
  <ul className={className}>
    {items.map(item => (
      <ListItem key={`${keyPrefix}${item[keyProp]}`}>{listItem(item)}</ListItem>
    ))}
  </ul>
);

const ListItem = styled.li`
  display: flex;
  flex-flow: column nowrap;

  & + & {
    margin-top: ${rem(8)};
  }

  &:nth-child(odd) {
    background-color: hsla(0, 0%, 100%, 0.05);
  }
`;

export default styled(List)`
  padding: 0;
  margin: 0;
  list-style: none;
`;
