import { config, useSpring } from 'react-spring';

interface Options {
  color: string;
}

function useFillToLeft(on: boolean, options: Options) {
  const value = on ? 1 : 0;
  const [spring] = useSpring({
    value,
    config: config.default,
  });

  return {
    d: spring.value.interpolate({
      output: [
        'M100,0 L100,100, L100,100, L100,0 Z',
        'M100,0 M100,100, 20,100, 22,0 Z',
      ],
      range: [0, 1],
    }),
    fill: spring.value.interpolate({
      output: ['hsla(212, 50%, 50%, 0)', options.color],
      range: [0, 1],
    }),
  };
}

export default useFillToLeft;
