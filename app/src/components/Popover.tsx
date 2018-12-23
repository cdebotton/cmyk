import React, { ReactNode, MutableRefObject, useLayoutEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { css } from 'styled-components/macro';
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

  const width = useMemo(() => getWidth({ top, minWidth, anchorWidth: rect.width, left }), [
    top,
    minWidth,
    rect.width,
    left,
  ]);

  return createPortal(
    <div
      css={`
        position: fixed;
        top: 0;
        left: 0;
        background-color: hsla(0, 0%, 0%, 0.5);
        color: #fff;
        border-radius: 4px;
        top: ${rem(top)};
        ${width};
        ${padding(rem(8))};
      `}
      hidden={hidden}
    >
      {children}
    </div>,
    portal,
  );
}

export default Popover;
