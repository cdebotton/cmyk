import { ComponentType, ReactNode } from 'react';

declare module 'react' {
  export const Suspense: ComponentType<{
    maxDuration?: number;
    fallback: ReactNode;
  }>;

  export const ConcurrentMode: ComponentType<{}>;

  type Thenable<T, R> = {
    then(
      resolve: (value: T) => unknown,
      reject: (error: unknown) => unknown,
    ): R;
  };

  export function lazy<T, R>(
    ctor: () => Thenable<T, R>,
  ): {
    then: Thenable<T, R>;
    _reactStatus: number;
    _reactResult: null;
  };
}
