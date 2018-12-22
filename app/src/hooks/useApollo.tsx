import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient, {
  ApolloQueryResult,
  FetchMoreOptions,
  FetchMoreQueryOptions,
  MutationOptions,
  ObservableQuery,
  MutationUpdaterFn,
  OperationVariables,
  QueryOptions,
} from 'apollo-client';
import { DocumentNode } from 'graphql';
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { FetchResult } from 'apollo-link';

const ApolloContext = createContext<ApolloClient<NormalizedCacheObject> | null>(null);

interface ProviderProps {
  children: ReactNode;
  client: ApolloClient<NormalizedCacheObject>;
}

export function ApolloProvider({ children, client }: ProviderProps) {
  return <ApolloContext.Provider value={client}>{children}</ApolloContext.Provider>;
}

export function useApolloClient() {
  return useContext(ApolloContext);
}

export function useQuery<TData, TVariables = OperationVariables>(
  query: any,
  {
    variables,
    ...restOptions
  }: Pick<QueryOptions<TVariables>, Exclude<keyof QueryOptions<TVariables>, 'query'>> = {},
): ApolloQueryResult<TData> {
  const client = useApolloClient();

  if (!client) {
    throw new Error('No client, wrap app in ApolloProvider');
  }

  const [result, setResult] = useState<ApolloQueryResult<TData> | null>(null);
  const previousQuery = useRef<DocumentNode | null>(null);
  const previousVariables = useRef<TVariables | undefined>(undefined);
  const observableQuery = useRef<ObservableQuery<TData> | null>(null);

  useEffect(
    () => {
      if (observableQuery.current === null) {
        return;
      }

      const subscripton = observableQuery.current.subscribe(nextResult => {
        setResult(nextResult);
      });

      return () => {
        subscripton.unsubscribe();
      };
    },
    [query, objToKey(variables), objToKey(restOptions)],
  );

  const helpers = {
    fetchMore: <K extends keyof TVariables>(
      fetchMoreOptions: FetchMoreQueryOptions<TVariables, K> &
        FetchMoreOptions<TData, TVariables | OperationVariables>,
    ) => {
      if (observableQuery.current) {
        return observableQuery.current.fetchMore(fetchMoreOptions);
      }
    },
  };

  if (!(query === previousQuery.current && isEqual(variables, previousVariables.current))) {
    previousQuery.current = query;
    previousVariables.current = variables;

    const watchedQuery = client.watchQuery<TData, TVariables>({
      query,
      variables,
      ...restOptions,
    });
    observableQuery.current = watchedQuery;

    const currentResult = watchedQuery.currentResult() as any;
    if (currentResult.partial) {
      throw watchedQuery.result();
    }
    setResult(currentResult);
    return { ...helpers, ...currentResult };
  }

  if (!result || Object.keys(result).length === 0) {
    throw new Error('No result');
  }

  return { ...helpers, ...result };
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type MutationHookOptions<T, TVariables> = Omit<
  MutationOptions<T, TVariables>,
  'mutation' | 'update'
> & {
  update?: MutationUpdaterFn<T>;
};

type MutationFn<TData, TVariables> = (
  localOptions?: MutationHookOptions<TData, TVariables>,
) => Promise<FetchResult<TData>>;

export function useMutation<TData, TVariables = OperationVariables>(
  mutation: DocumentNode,
  baseOptions: MutationHookOptions<TData, TVariables> = {},
): MutationFn<TData, TVariables> {
  const client = useApolloClient();

  if (!client) {
    throw new Error('No client, wrap app in ApolloProvider');
  }

  return localOptions => client.mutate({ mutation, ...baseOptions, ...localOptions });
}

function objToKey<T extends any>(obj?: T): string | null {
  if (!obj) {
    return null;
  }
  const keys = Object.keys(obj);
  keys.sort();
  const sortedObj = keys.reduce<Partial<T>>((result, key) => {
    result[key] = obj[key];
    return result;
  }, {});
  return JSON.stringify(sortedObj);
}
