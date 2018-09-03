import { createResource, createCache } from 'simple-cache-provider';
import { ComponentType } from 'react';

type Loader<Props> = () => Promise<{ default: ComponentType<Props> }>;

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

function componentFetcher<Props>(loader: Loader<Props>) {
  return Resource.read<{ default: ComponentType<Props> }>(cache, loader)
    .default;
}

export default componentFetcher;
