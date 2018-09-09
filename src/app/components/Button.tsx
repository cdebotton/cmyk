import { rem } from 'polished';
import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { foreground, Format, gradient } from '../styles/helpers';

interface IProps extends HTMLProps<HTMLButtonElement> {
  className?: string;
  format?: Format;
}

function Button({ className, format: _format, ...props }: IProps) {
  return (
    <>
      <button className={className} {...props} />
    </>
  );
}

export default styled(Button)`
  position: relative;
  border: none;
  cursor: pointer;
  padding: ${rem(12)};
  border-radius: 3px;
  ${gradient()};
  ${foreground()};
`;
