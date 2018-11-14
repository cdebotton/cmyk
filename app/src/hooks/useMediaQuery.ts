import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

interface Query {
  min?: number;
  max?: number;
}

interface MediaQueries {
  [name: string]: Query;
}

function useMediaQuery<T extends MediaQueries>(mediaQueries: T) {
  const firstRun = useRef(true);
  const [windowSize, setWindowSize] = useState<Size>({ width: 0, height: 0 });

  const onResize = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  if (firstRun.current === true) {
    onResize();
    firstRun.current = false;
  }

  const activeQuery = useMemo<Array<keyof T>>(
    () => {
      const matches: (keyof T)[] = [];
      for (const [query, size] of Object.entries(mediaQueries)) {
        const max = size.max || Number.MAX_VALUE;
        const min = size.min || Number.MIN_VALUE;

        if (windowSize.width <= max && windowSize.width >= min) {
          matches.push(query);
        }
      }

      return matches;
    },
    [windowSize],
  );

  const matchQuery = useCallback((query: keyof T) => {
    return activeQuery.some(q => q === query);
  }, []);

  return matchQuery;
}

export default useMediaQuery;
