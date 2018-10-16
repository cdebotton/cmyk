export function memoize<T extends any, U>(fn: (...args: T[]) => U) {
  const cache: Record<string, U> = {};

  return (...args: T[]) => {
    const argsKey = JSON.stringify(args);
    if (cache[argsKey]) {
      return cache[argsKey];
    }

    const value = fn(...args);
    cache[argsKey] = value;

    return value;
  };
}
