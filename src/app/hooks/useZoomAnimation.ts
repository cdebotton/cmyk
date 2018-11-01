import { config, useSpring } from 'react-spring';

function useZoomAnimation(on: boolean) {
  const value = on ? 1 : 0;
  const [spring] = useSpring({ value, config: config.default });

  return {
    backgroundColor: spring.value
      .interpolate({ output: [0.1, 0.225], range: [0, 1] })
      .interpolate(a => `hsla(0, 0%, 100%, ${a})`),
    boxShadow: spring.value
      .interpolate({ output: [0.1, 0.4], range: [0, 1] })
      .interpolate(a => `'0px 0px 10px hsla(0, 0%, 0%, ${a})'`),
    transform: spring.value
      .interpolate({ output: ['0px', '20px'], range: [0, 1] })
      .interpolate(z => `translate3d(0, 0, ${z})`),
  };
}

export default useZoomAnimation;
