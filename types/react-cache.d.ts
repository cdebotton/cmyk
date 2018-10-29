declare module 'react-cache' {
  interface Resource<T, U> {
    read: (arg: U) => T;
    preload: (arg: U) => void;
  }

  export function createResource<T, U>(
    fetcher: (arg: U) => Promise<T>,
    hasher?: (arg: U) => string,
  ): Resource<T, U>;
}
