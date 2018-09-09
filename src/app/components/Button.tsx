import React, { HTMLProps } from 'react';
import styled from 'styled-components';

interface IProps extends HTMLProps<HTMLButtonElement> {
  className?: string;
}

function Button({ className, ...props }: IProps) {
  return <button className={className} {...props} />;
}

export default styled(Button)`
  position: relative;
`;
