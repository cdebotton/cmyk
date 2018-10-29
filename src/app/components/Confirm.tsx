import { padding, position, rem, size } from 'polished';
import React, { MouseEventHandler, ReactNode, useEffect } from 'react';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';
import Button from './Button';

const Overlay = styled(animated.div)`
  display: grid;
  align-content: center;
  justify-content: center;
  background-color: hsla(0, 0%, 0%, 0.45);
  perspective: 800px;
  ${position('absolute', 0, 0)};
  ${size('100%')};
`;

const Alert = styled(animated.div)`
  display: grid;
  grid-template-rows: min-content auto min-content;
  grid-auto-flow: column dense;
  background-color: hsla(0, 0%, 100%, 0.15);
  box-shadow: 3px 3px 5px hsla(0, 0%, 0%, 0.05);
  border-radius: 3px;
  backdrop-filter: blur(3px);
`;

const Title = styled.header`
  font-family: 'Raleway', sans-serif;
  font-size: ${rem(16)};
  font-weight: 300;
  background-color: hsla(250, 50%, 50%, 0.35);
  color: #fff;
  ${padding(rem(16), rem(32))};
`;

const Message = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: ${rem(16)};
  color: #fff;
  font-weight: 100;
  ${padding(rem(32))};
`;

const Actions = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${rem(8)};
  ${padding(0, rem(16), rem(16), '50%')};
`;

interface Props {
  title: ReactNode;
  message: ReactNode;
  onConfirm: MouseEventHandler<HTMLElement>;
  onCancel: MouseEventHandler<HTMLElement>;
}

function Confirm({ title, message, onConfirm, onCancel }: Props) {
  const [{ x }, setSpring] = useSpring({
    config: config.default,
    x: 0,
  });

  useOnMount(() => {
    setSpring({ x: 1 });
  });

  useOnUnmount(() => {
    setSpring({ x: 0 });
  });

  return (
    <Overlay
      style={{
        opacity: x,
      }}
    >
      <Alert
        style={{
          opacity: x,
          transform: x
            .interpolate({
              output: [rem(-500), rem(0)],
              range: [0, 1],
            })
            .interpolate(y => `translate3d(0, 0, ${y})`),
        }}
      >
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Actions>
          <Button onClick={onConfirm}>Okay</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Actions>
      </Alert>
    </Overlay>
  );
}

function useOnMount(onMount: () => void) {
  useEffect(onMount, []);
}

function useOnUnmount(onUnmount: () => void) {
  useEffect(() => {
    return () => onUnmount();
  }, []);
}

export default Confirm;
