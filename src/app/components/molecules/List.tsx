import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = {
  className?: string;
  transformProps?: (props: any) => any;
  generateKey: (props: any) => string;
  items: any[];
  renderItem: (props: any) => ReactNode;
  children?: never;
};

function List<T>(props: Props) {
  const { className, items, renderItem, generateKey, transformProps } = props;

  return (
    <ul className={className}>
      {items.map(item => {
        const itemProps = transformProps ? transformProps(item) : item;

        return (
          <ListItem key={`${generateKey(item)}`}>
            {renderItem(itemProps)}
          </ListItem>
        );
      })}
    </ul>
  );
}

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
