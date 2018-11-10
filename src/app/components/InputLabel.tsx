import { modularScale, rem } from 'polished';
import React, { ReactNode, useMemo } from 'react';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';

const Label = styled(animated.label)<{ blockEvents: boolean }>`
  cursor: pointer;
  left: ${rem(6)};
  padding: ${rem(2)};
  position: absolute;
  top: 0;
  pointer-events: ${props => (props.blockEvents ? 'none' : 'inherit')};
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
  const colorSpring = useMemo(
    () => {
      if (empty || (!empty && focused)) {
        return '#000';
      }

      return '#fff';
    },
    [focused, empty],
  );

  const [labelSpring] = useSpring({
    color: colorSpring,
    config: config.stiff,
    fontSize: empty ? modularScale(0) : modularScale(-1),
    letterSpacing: empty ? rem(0) : rem(1),
    transform: empty ? `translate3d(0, ${rem(5)}, 0)` : `translate3d(0, ${rem(-20)}, 0)`,
  });

  const [backerSpring] = useSpring({
    opacity: focused ? 1 : 0,
    transform: focused ? 'scaleX(1)' : 'scaleX(0)',
  });

  return (
    <Label htmlFor={htmlFor} style={labelSpring} blockEvents={empty}>
      <LabelBacker style={backerSpring} />
      {children}
    </Label>
  );
}

export default InputLabel;
