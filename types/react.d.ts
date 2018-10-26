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

  interface StateSetter<T> {
    (state: T): void;
    (setState: (prevState: T) => T): void;
  }

  export function useState<T>(initialValue: T): [T, StateSetter<T>];

  type Loader<T> = Promise<{ default: ComponentType<T> }>;

  export function lazy<T>(loader: () => Loader<T>): ComponentType<T>;
}
