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
  background-color: hsla(0, 0%, 100%, 0.2);
  backdrop-filter: blur(2px);
  color: #fff;
  text-decoration: none;
  overflow: hidden;
`;

const Label = styled.span`
  position: relative;
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
      <animated.span
        style={{
          backgroundColor: 'black',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          transform: spring.x.interpolate(
            x => `scaleX(${x}) translate3d(0, 0, ${rem(x * 20)})`,
          ),
          transformOrigin: '0 0',
          width: '100%',
        }}
      />
      <Label>{children}</Label>
    </Element>
  );
}

export default ButtonLink;
