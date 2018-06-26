import React, { SFC, HTMLProps } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = { foo?: boolean };

const Foo: SFC<Props> = props => <button {...props} />;

const Button = styled.button`
  position: relative;
  padding: ${rem(5)};
  cursor: pointer;
`;

export default Button;
