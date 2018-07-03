import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { rem } from 'polished';

const LinkBlock = styled(NavLink)`
  position: relative;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: ${rem(10)} ${rem(5)};
  border-top: 1px solid inherit;

  &:last-of-type {
    border-bottom: 1px solid inherit;
  }
`;

export default LinkBlock;
