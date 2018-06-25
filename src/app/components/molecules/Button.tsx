import React from 'react';
import styled from 'styled-components';
import Block from '../atoms/Block';
import { rem } from 'polished';

const Button = Block.withComponent('button').extend.attrs({ type: 'button' })`
  position: relative;
  padding: ${rem(5)};
  cursor: pointer;
`;

export default Button;
