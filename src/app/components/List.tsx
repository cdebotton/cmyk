import { padding, rem } from 'polished';
import { animated } from 'react-spring';
import styled from 'styled-components';

const Item = styled(animated.li)`
  border-radius: 5px;
  ${padding(rem(8))};
  perspective: 800px;
  transform-style: preserve-3d;
`;

const List = styled.ul`
  grid-column: 2 / span 1;
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-gap: ${rem(16)};
  perspective: 800px;
`;

export default List;
export { Item };
