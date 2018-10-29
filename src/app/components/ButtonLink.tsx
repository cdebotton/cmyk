import { padding, rem } from 'polished';
import React, { MouseEvent } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';
import { Format } from '../styles/helpers';

interface Props extends LinkProps {
  className?: string;
  format?: Format;
}

const Element = styled(Link)`
  position: relative;
  font-size: ${rem(16)};
  ${padding(rem(8), rem(16))};
  border-radius: 3px;
  font-family: 'Roboto', sans-serif;
  backdrop-filter: blur(2px);
  color: #fff;
  text-decoration: none;
  overflow: hidden;
`;

const Label = styled.span`
  position: relative;
`;

const Backer = styled(animated.span)`
  background-color: hsla(0, 0%, 20%, 0.2);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transformorigin: 0 0;
  width: 100%;
`;

function ButtonLink({ children, ...props }: Props) {
  const [spring, setSpring] = useSpring({ x: 0, config: config.stiff });

  function onMouseEnter(event: MouseEvent<any>) {
    if (props.onMouseEnter) {
      props.onMouseEnter(event);
    }

    setSpring({ x: 1 });
  }

  function onMouseLeave(event: MouseEvent<any>) {
    if (props.onMouseLeave) {
      props.onMouseLeave(event);
    }

    setSpring({ x: 0 });
  }

  return (
    <Element {...props} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Backer
        style={{
          backgroundColor: 'hsla(0, 0%, 20%, 0.2)',
          transform: spring.x.interpolate(
            x => `scaleX(${x}) translate3d(0, 0, ${rem(x * 20)})`,
          ),
          transformOrigin: '0 0',
        }}
      />
      <Backer
        style={{
          backgroundColor: `hsla(0, 0%, 100%, 0.2)`,
          transform: spring.x.interpolate(
            x => `scaleX(${1 - x}) translate3d(0, 0, ${rem((1 - x) * 20)})`,
          ),
          transformOrigin: '100% 0',
        }}
      />
      <Label>{children}</Label>
    </Element>
  );
}

export default ButtonLink;
