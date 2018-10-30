import { ComponentType, ReactNode, Context } from 'react';

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

  export function useContext<T>(context: Context<T>): T;

  type ReducerFn<T, U> = (memo: T, action: U) => T;
  type Dispatch<U> = (action: U) => void;
  export function useReducer<T, U extends { type: string }>(
    reducer: ReducerFn<T, U>,
    initialState: T,
  ): [T, Dispatch<U>];

  export function useEffect(
    effect: () => void | (() => void),
    cDU?: any[],
  ): void;

  export function useLayoutEffect(
    effect: () => void | (() => void),
    cDU?: any[],
  ): void;

  export function useMutationEffect(
    effect: () => void | (() => void),
    cDU?: any[],
  ): void;

  export function useMemo<T>(memoizer: () => T, watch: any[]): T;

  export function useRef<T>(initial?: T): { current: T | null };

  type Loader<T> = Promise<{ default: ComponentType<T> }>;

  export function lazy<T>(loader: () => Loader<T>): ComponentType<T>;

  export function memo<T>(
    component: ComponentType<T>,
    areEqual?: (prevProps: T, nextProps: T) => boolean,
  ): ComponentType<T>;
}
