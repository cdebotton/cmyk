import { padding, rem } from 'polished';
import React, { ReactNode, useEffect, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';

const ItemContainer = styled(animated.li)`
  border-radius: 5px;
  ${padding(rem(8))};
  perspective: 800px;
  transform-style: preserve-3d;
`;

interface ItemElementProps {
  children: ReactNode;
}

function ItemElement({ children }: ItemElementProps) {
  const [hoverList, setHoverList] = useState(false);

  const itemStates = {
    blur: {
      backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
      boxShadow: '0px 0px 10px hsla(0, 0%, 0%, 0.1)',
      config: config.default,
      transform: 'translate3d(0, 0, 0px)',
    },
    focus: {
      backgroundColor: 'hsla(0, 0%, 100%, 0.225)',
      boxShadow: '0px 10px 40px hsla(0, 0%, 0%, 0.4)',
      transform: 'translate3d(0, 0, 20px)',
    },
  };

  const [listStyles, setListStyles] = useSpring({
    ...itemStates.blur,
    config: config.default,
  });

  useEffect(() => {
    if (hoverList) {
      setListStyles(itemStates.focus);
    } else {
      setListStyles(itemStates.blur);
    }
  });

  return (
    <ItemContainer
      onMouseEnter={() => setHoverList(true)}
      onMouseLeave={() => setHoverList(false)}
      style={listStyles}
    >
      {children}
    </ItemContainer>
  );
}

const ListElement = styled.ul`
  grid-column: 2 / span 1;
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-gap: ${rem(16)};
  perspective: 800px;
`;

interface Props<T> {
  className?: string;
  items: T[];
  getItemKey: (item: T) => string;
  render: (item: T) => ReactNode;
}

function List<T>({ className, getItemKey, items, render }: Props<T>) {
  return (
    <ListElement className={className}>
      {items.map(item => {
        return <ItemElement key={getItemKey(item)}>{render(item)}</ItemElement>;
      })}
    </ListElement>
  );
}

export default List;
