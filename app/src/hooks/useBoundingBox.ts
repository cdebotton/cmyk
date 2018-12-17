import { MutableRefObject, useState, useLayoutEffect, useCallback, useEffect } from 'react';

function useBoundingBox<T extends HTMLElement>(ref: MutableRefObject<T | null>) {
  const [rect, setRect] = useState(() => {
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height: 0,
      width: 0,
    };
  });

  const updateRect = useCallback(
    () => {
      if (!ref.current) {
        return;
      }

      setRect(ref.current.getBoundingClientRect());
    },
    [ref.current],
  );

  useEffect(() => {
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  });

  useLayoutEffect(updateRect, [ref.current]);

  return rect;
}

export default useBoundingBox;
