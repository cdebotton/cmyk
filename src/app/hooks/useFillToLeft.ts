import { useEffect } from 'react';
import { config, useSpring } from 'react-spring';

interface Options {
  color: string;
}

function useFillToLeft(on: boolean, options: Options) {
  const deleteStates = {
    blur: {
      d: 'M100,0 L100,100, L100,100, L100,0 Z',
      fill: 'hsla(212, 50%, 50%, 0)',
    },
    disabled: {
      d: 'M100,0 L100,100, L100,100, L100,0 Z',
      fill: 'hsla(212, 50%, 50%, 0)',
    },
    focus: {
      d: 'M100,0 M100,100, 20,100, 22,0 Z',
      fill: options.color,
    },
  };

  const [spring, setSpring] = useSpring({
    config: config.default,
    ...deleteStates.disabled,
  });

  useEffect(
    () => {
      if (on) {
        setSpring(deleteStates.focus);
      } else {
        setSpring(deleteStates.blur);
      }
    },
    [on],
  );

  return spring;
}

export default useFillToLeft;
