import { rem } from 'polished';
import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { foreground, Format, gradient } from '../styles/helpers';

interface IProps extends HTMLProps<HTMLButtonElement> {
  className?: string;
  format?: Format;
}

export default styled.button`
  position: relative;
  border: none;
  cursor: pointer;
  padding: ${rem(12)};
  border-radius: 3px;
  ${gradient()};
  ${foreground()};

  :disabled {
    opacity: 0.25;
    cursor: default;
  }
`;
