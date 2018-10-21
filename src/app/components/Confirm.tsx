import { padding, position, rem, size } from 'polished';
import React, { MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Overlay = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  background-color: hsla(0, 0%, 0%, 0.45);
  ${position('absolute', 0, 0)};
  ${size('100%')};
`;

const Alert = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  grid-auto-flow: column dense;
  background-color: hsla(0, 0%, 100%, 0.75);
  border-radius: 3px;
`;

const Title = styled.header`
  background-image: linear-gradient(
    to bottom right,
    hsla(212, 50%, 50%, 1),
    hsla(242, 50%, 50%, 1)
  );
  color: #fff;
  ${padding(rem(8), rem(16))};
`;

const Message = styled.div`
  ${padding(rem(16))};
`;

interface Props {
  title: ReactNode;
  message: ReactNode;
  onConfirm: MouseEventHandler<HTMLElement>;
  onCancel: MouseEventHandler<HTMLElement>;
}

function Confirm({ title, message, onConfirm, onCancel }: Props) {
  return (
    <Overlay>
      <Alert>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Button onClick={onConfirm}>Okay</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Alert>
    </Overlay>
  );
}

export default Confirm;
