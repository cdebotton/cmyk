import { rem } from 'polished';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  margin-bottom: ${rem(5)};

  &:last-child {
    margin-bottom: 0;
  }
`;

export { List as default, Item };
