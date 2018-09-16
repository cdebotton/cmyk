import { ComponentType, ReactNode } from 'react';

declare module 'react' {
  export const Placeholder: ComponentType<{
    delayMs?: number;
    fallback: ReactNode;
  }>;

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
