import React, { ReactNode, MutableRefObject, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { padding, rem } from 'polished';
import useBoundingBox from '../hooks/useBoundingBox';
import useViewport from '../hooks/useViewport';

type PortalProps = {
  anchorWidth: number;
  minWidth: number;
  top: number;
  left: number;
};

function getWidth({ minWidth, anchorWidth, left }: PortalProps) {
  if (minWidth > anchorWidth) {
    return css`
      left: 10vw;
      width: 80vw;
    `;
  }

  return css`
    width: ${rem(anchorWidth)};
    left: ${rem(left)};
  `;
}

const Portal = styled.div<PortalProps>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsla(0, 0%, 0%, 0.5);
  color: #fff;
  border-radius: 4px;
  top: ${props => rem(props.top)};
  ${getWidth};
  ${padding(rem(8))};
`;

const MARGIN = 8;

interface Props {
  children: ReactNode;
  hidden?: boolean;
  minWidth?: number;
  anchor: MutableRefObject<null | HTMLElement>;
}

function Popover({ anchor, children, hidden, minWidth = 0 }: Props) {
  const portal = document.getElementById('portal');

  if (!portal) {
    throw new Error('Could not find portal to mount to');
  }

  const viewport = useViewport();
  const rect = useBoundingBox(anchor);
  const [{ top, left }, setPosition] = useState({
    top: 0,
    left: 0,
  });

  useLayoutEffect(
    () => {
      setPosition({
        top: rect.bottom + MARGIN,
        left: rect.left,
      });
    },
    [rect, viewport],
  );

  return createPortal(
    <Portal top={top} left={left} anchorWidth={rect.width} minWidth={minWidth} hidden={hidden}>
      {children}
    </Portal>,
    portal,
  );
}

export default Popover;
