import { padding, rem } from 'polished';
import React, { ReactNode, useMemo, useRef } from 'react';
import { animated, useSpring } from 'react-spring/hooks';
import styled, { css } from 'styled-components';
import useBoundingClientRect from '../hooks/useBoundingClientRect';

type Position = 'top' | 'right' | 'bottom' | 'left';

const Target = styled.span`
  position: relative;
  display: inherit;
  display: grid;
`;

const Popup = styled(animated.span)<{ position: Position }>`
  position: absolute;
  pointer-events: none;
  font-size: ${rem(12)};
  background-color: hsla(0, 0%, 0%, 0.75);
  text-align: center;
  border-radius: 3px;
  white-space: nowrap;

  ${padding(rem(4), rem(6))};
  ${({ position }) => {
    switch (position) {
      case 'top':
        return css`
          bottom: 100%;
          justify-self: center;
        `;
      case 'right':
        return css`
          left: 100%;
          align-self: center;
        `;
      case 'bottom':
        return css`
          top: 100%;
          justify-self: center;
        `;
      case 'left':
        return css`
          right: 100%;
          align-self: center;
        `;
    }
  }};
`;

interface Props {
  children: ReactNode;
  content: ReactNode;
}

function Tooltip({ children, content }: Props) {
  const target = useRef<any | null>(null);
  const popup = useRef<any | null>(null);

  const targetRect = useBoundingClientRect(target);
  const popupRect = useBoundingClientRect(popup);
  const position = useMemo(() => getPosition(targetRect, popupRect), [targetRect, popupRect]);

  const [styles, setStyles] = useSpring(() => {
    return {
      opacity: 0,
      transform: getOrigin(position),
    };
  });

  function showTooltip() {
    setStyles({
      opacity: 1,
      transform: `translate3d(0rem, 0rem, 0rem)`,
    });
  }

  function hideTooltip() {
    setStyles({
      opacity: 0,
      transform: getOrigin(position),
    });
  }

  return (
    <Target ref={target} onMouseMoveCapture={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      <Popup position={position} ref={popup} style={styles}>
        {content}
      </Popup>
    </Target>
  );
}

function getPosition(
  targetRect: ClientRect | DOMRect | null,
  popupRect: ClientRect | DOMRect | null,
): Position {
  if (targetRect && popupRect) {
    const { top, right, bottom, left } = targetRect;

    const { width, height } = popupRect;

    if (
      top === null ||
      right === null ||
      bottom === null ||
      left === null ||
      width === null ||
      height === null
    ) {
      return 'top';
    }

    if (height <= top) {
      return 'top';
    }

    if (height <= bottom) {
      return 'bottom';
    }

    if (width <= right) {
      return 'right';
    }

    if (width <= left) {
      return 'left';
    }
  }

  return 'top';
}

function getOrigin(position: Position) {
  const TRAVEL = 25;
  switch (position) {
    case 'top':
      return `translate3d(0rem, ${rem(TRAVEL)}, 0rem)`;
    case 'right':
      return `translate3d(${rem(-TRAVEL)}, 0rem, 0rem)`;
    case 'bottom':
      return `translate3d(0rem, ${rem(-TRAVEL)}, 0rem)`;
    case 'left':
      return `translate3d(${rem(TRAVEL)}, 0rem, 0rem)`;
  }
}

export default Tooltip;
