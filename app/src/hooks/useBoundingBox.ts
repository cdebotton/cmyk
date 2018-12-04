import { MutableRefObject, useState, useEffect } from 'react';

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

  useEffect(
    () => {
      if (!ref.current) {
        return;
      }

      setRect(ref.current.getBoundingClientRect());
    },
    [ref.current],
  );

  return rect;
}

export default useBoundingBox;
