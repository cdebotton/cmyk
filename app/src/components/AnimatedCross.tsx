import React, { SVGProps, useEffect, useState } from 'react';
// @ts-ignore
import { animated, config, useSpring } from 'react-spring/hooks';
import styled from 'styled-components';

interface Props extends SVGProps<SVGElement> {
  className?: string;
}

function AnimatedCross({ className, ...props }: Props) {
  const [hovering, setHovering] = useState(false);
  const [interpolation, setInterpolation] = useSpring(() => {
    return {
      config: config.default,
      leftPath: 'M 20 20 L 20 44',
      rightPath: 'M 44 20 L 44 44',
      strokeWidth: '2px',
    };
  });

  useEffect(() => {
    const leftPath = hovering ? 'M 10 10 L 54 54' : 'M 24 24 L 40 40';
    const rightPath = hovering ? 'M 54 10 L 10 54' : 'M 40 24 L 24 40';
    const strokeWidth = hovering ? '4px' : '2px';

    setInterpolation({
      config: config.default,
      leftPath,
      rightPath,
      strokeWidth,
    });
  });

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      onMouseEnter={event => {
        setHovering(true);

        if (props.onMouseEnter) {
          props.onMouseEnter(event);
        }
      }}
      onMouseLeave={event => {
        setHovering(false);

        if (props.onMouseLeave) {
          props.onMouseLeave(event);
        }
      }}
    >
      <animated.path
        d={interpolation.leftPath}
        fill="transparent"
        strokeWidth={interpolation.strokeWidth}
        strokeLinecap="round"
        stroke="#fff"
      />
      <animated.path
        d={interpolation.rightPath}
        fill="transparent"
        strokeWidth={interpolation.strokeWidth}
        strokeLinecap="round"
        stroke="#fff"
      />
    </svg>
  );
}

export default styled(AnimatedCross)``;
