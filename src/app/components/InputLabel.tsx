import { modularScale, rem } from 'polished';
import React, { ReactNode } from 'react';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';

const Label = styled(animated.label)`
  cursor: pointer;
  left: ${rem(6)};
  padding: ${rem(2)};
  position: absolute;
  top: 0;
`;

const LabelBacker = styled(animated.span)`
  background-color: #fff;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform-origin: 0 0;
  width: 100%;
  z-index: -1;
`;

interface Props {
  children: ReactNode;
  empty: boolean;
  focused: boolean;
  htmlFor?: string;
}

function InputLabel({ children, focused, empty, htmlFor }: Props) {
  const [{ x, y }] = useSpring({
    config: config.stiff,
    x: empty ? 0 : 1,
    y: focused ? 1 : 0,
  });

  return (
    <Label
      htmlFor={htmlFor}
      style={{
        color: y.interpolate({
          output: ['#fff', '#000'],
          range: [0, 1],
        }),
        fontSize: x.interpolate(value => modularScale(-value)),
        letterSpacing: x.interpolate(value => `${value}px`),
        pointerEvents: empty ? 'none' : 'inherit',
        transform: x
          .interpolate({ range: [0, 1], output: [5, -20] })
          .interpolate(value => `translate3d(0, ${rem(value)}, 0)`),
      }}
    >
      <LabelBacker
        style={{
          opacity: y,
          transform: y.interpolate(value => `scaleX(${value})`),
        }}
      />
      {children}
    </Label>
  );
}

export default InputLabel;
