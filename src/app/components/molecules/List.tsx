import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = {
  className?: string;
  transformProps?: (props: any) => any;
  generateKey: (props: any) => string;
  items: any[];
  renderItem: (props: any, index: number) => ReactNode;
  children?: never;
};

function List<T>(props: Props) {
  const { className, items, renderItem, generateKey, transformProps } = props;

  return (
    <ul className={className}>
      {items.map((item, index) => {
        const itemProps = transformProps ? transformProps(item) : item;

        return (
          <ListItem key={`${generateKey(item)}`}>
            {renderItem(itemProps, index)}
          </ListItem>
        );
      })}
    </ul>
  );
}

const ListItem = styled.li`
  display: flex;
  flex-flow: column nowrap;
`;

export default styled(List)`
  padding: 0;
  margin: 0;
  list-style: none;
`;
