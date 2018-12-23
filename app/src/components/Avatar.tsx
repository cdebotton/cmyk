import React, { CSSProperties } from 'react';
import { rem, size } from 'polished';
import 'styled-components/macro';
import { animated } from 'react-spring/hooks';

interface Props {
  className?: string;
  size: number;
  src: string;
  style?: CSSProperties;
}

function Avatar({ size: imgSize, src }: Props) {
  return (
    <animated.span
      css={`
        display: inline-block;
        background-image: url(${src});
        background-size: cover;
        border-radius: 50%;
        ${size(rem(imgSize))};
      `}
    />
  );
}

export default Avatar;
