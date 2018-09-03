declare module 'simple-cache-provider' {
  interface Cache {
    invalidate(): void;
    read<K, V, A>(
      resourceType: unknown,
      key: K,
      miss: (arg: A) => Promise<V>,
      missArg: A,
    ): void;
    preload<K, V, A>(
      resourceType: unknown,
      key: K,
      miss: (arg: A) => Promise<V>,
      missArg: A,
    ): void;
    $$typeof?: Symbol | number;
  }

  interface Resource<K> {
    read<V>(cache: Cache, key: K): V;
    preload(cache: Cache, key: K): void;
  }

  type Primitive = string | number | boolean | void | null;

  export function createCache(invalidator?: () => unknown): Cache;

  // export function createResource<V, K extends Primitive, H extends Primitive>(
  //   loadResource: (key: K) => Promise<V>,
  //   hash?: (key: K) => H,
  // ): Resource<K, V>;

  export function createResource<V, K extends unknown, H extends Primitive>(
    loadResource: (key: K) => Promise<V>,
    hash: (key: K) => H,
  ): Resource<K>;
}
