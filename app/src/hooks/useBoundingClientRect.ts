import { RefObject, useLayoutEffect, useState } from 'react';

function useBoundingClientRect<T extends Element>(ref: RefObject<T>) {
  const [rect, setRect] = useState<ClientRect | DOMRect | null>(null);

  useLayoutEffect(
    () => {
      if (ref.current) {
        const currentRect = ref.current.getBoundingClientRect();
        setRect(currentRect);
      }
    },
    [ref.current],
  );

  return rect;
}

export default useBoundingClientRect;
