import { ComponentType } from 'react';
import { createCache, createResource } from 'simple-cache-provider';

type Loader<P> = () => Promise<{ default: ComponentType<P> }>;

const cache = createCache();

const Resource = createResource(
  loader => {
    if (typeof loader === 'function') {
      const promise = loader();
      if (!promise.then) {
        throw new TypeError(
          'Promise returning method was not passed to module fetcher',
        );
      }

      return promise;
    }
  },
  loader => loader.toString(),
);

function componentFetcher<P>(loader: Loader<P>) {
  return Resource.read<{ default: ComponentType<P> }>(cache, loader).default;
}

export default componentFetcher;
