import { rem } from 'polished';
import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { foreground, Format, gradient } from '../styles/helpers';

interface Props extends HTMLProps<HTMLButtonElement> {
  className?: string;
  format?: Format;
}

export default styled.button<Props>`
  position: relative;
  border: none;
  cursor: pointer;
  height: ${rem(32)};
  font-size: ${rem(12)};
  border-radius: 3px;
  font-family: 'Raleway', sans-serif;
  mix-blend-mode: burn;

  :disabled {
    opacity: 0.25;
    cursor: default;
  }
`;
