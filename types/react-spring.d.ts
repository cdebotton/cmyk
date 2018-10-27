import { SpringConfig } from 'react-spring';

declare module 'react-spring' {
  type SpringOptions<T> = {
    config?: SpringConfig | ((key: string) => SpringConfig);
  } & T;

  type SpringSetter<T> = (options: Partial<SpringOptions<T>>) => void;

  type InterpolationOptions<T> = {
    range: T[];
    output: any[];
  };

  interface InterpolationFn<T> {
    (options: InterpolationOptions<T>): Interpolation<T> & T & string;
    (interpolator: (params: T) => string): Interpolation<T> & T & string;
  }

  type Interpolation<T> = {
    interpolate: InterpolationFn<T>;
  } & T;

  type AnimatedValue<T> = { [K in keyof T]: Interpolation<T[K]> };

  export function useSpring<T>(
    options: SpringOptions<T>,
  ): [AnimatedValue<T>, SpringSetter<T>];
}
