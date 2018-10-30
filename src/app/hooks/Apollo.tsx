import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient, {
  ApolloQueryResult,
  FetchMoreOptions,
  FetchMoreQueryOptions,
  ObservableQuery,
  OperationVariables,
} from 'apollo-client';
import { DocumentNode } from 'graphql';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MutationFn, MutationOptions } from 'react-apollo';
import isEqual from 'react-fast-compare';

const ApolloContext = createContext<ApolloClient<NormalizedCacheObject> | null>(
  null,
);

interface ProviderProps {
  children: ReactNode;
  client: ApolloClient<NormalizedCacheObject>;
}

export function ApolloProvider({ children, client }: ProviderProps) {
  return (
    <ApolloContext.Provider value={client}>{children}</ApolloContext.Provider>
  );
}

export function useApolloClient() {
  return useContext(ApolloContext);
}

export function useApolloQuery<TData, TVariables = OperationVariables>(
  query: any,
  { variables }: { variables?: TVariables } = {},
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
    [query, objToKey(variables || {})],
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

  if (
    !(
      query === previousQuery.current &&
      isEqual(variables, previousVariables.current)
    )
  ) {
    previousQuery.current = query;
    previousVariables.current = variables;

    const watchedQuery = client.watchQuery<TData, TVariables>({
      query,
      variables,
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

export function useApolloMutation<TData, TVariables = OperationVariables>(
  mutation: DocumentNode,
  baseOptions: Partial<MutationOptions<TData, Partial<TVariables>>> = {},
): MutationFn<TData, TVariables> {
  const client = useApolloClient();

  if (!client) {
    throw new Error('No client, wrap app in ApolloProvider');
  }

  return localOptions =>
    client.mutate({ mutation, ...baseOptions, ...localOptions });
}

function objToKey<T extends any>(obj: T): string {
  const keys = Object.keys(obj);
  keys.sort();
  const sortedObj = keys.reduce<Partial<T>>((result, key) => {
    result[key] = obj[key];
    return result;
  }, {});
  return JSON.stringify(sortedObj);
}
