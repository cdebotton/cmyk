import { padding, rem } from 'polished';
import React, {
  ReactNode,
  RefObject,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { animated, config, useSpring } from 'react-spring';
import styled, { css } from 'styled-components';

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

type Nullable<T> = { [K in keyof T]: T[K] | null };

interface Props {
  children: ReactNode;
  content: ReactNode;
}

function Tooltip({ children, content }: Props) {
  const target = useRef<HTMLElement | null>(null);
  const popup = useRef<HTMLElement | null>(null);

  const targetRect = useElementSize(target);
  const popupRect = useElementSize(popup);
  const position = useMemo(() => getPosition(targetRect, popupRect), [
    targetRect,
    popupRect,
  ]);

  const [styles, setStyles] = useSpring({
    config: config.stiff,
    opacity: 0,
    transform: getOrigin(position),
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
    <Target
      ref={target}
      onMouseMoveCapture={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <Popup position={position} ref={popup} style={styles}>
        {content}
      </Popup>
    </Target>
  );
}

function getPosition(
  targetRect: Nullable<ClientRect>,
  popupRect: Nullable<ClientRect>,
): Position {
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

function useElementSize<T extends HTMLElement | null>(ref: RefObject<T>) {
  const [rect, setRect] = useState<Nullable<ClientRect>>({
    bottom: null,
    height: null,
    left: null,
    right: null,
    top: null,
    width: null,
  });

  useLayoutEffect(
    () => {
      if (ref.current !== null) {
        const clientRect = ref.current.getBoundingClientRect();
        setRect(clientRect);
      }
    },
    [ref.current],
  );

  return rect;
}

export default Tooltip;
