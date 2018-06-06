import React, { SFC, createContext, ComponentType } from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';

const Context = createContext<Session | null>(null);

Context.Provider.displayName = 'SessionContextProvider';
Context.Consumer.displayName = 'SessionContextConsumer';

const getSessionQuery = gql`
  query GetSession {
    session {
      userId
      iat
    }
  }
`;

type Props = {
  loading: ComponentType<any>;
  error: ComponentType<{ error: ApolloError }>;
};

type Session = {
  userId: string;
  iat: number;
};

type Response = {
  session: Session | null;
};

const SessionProvider: SFC<Props> = ({
  children,
  loading: loader,
  error: ErrorComponent,
}) => (
  <Query query={getSessionQuery}>
    {({ data, error }: QueryResult<Response>) => {
      if (!data) {
        return loader;
      }

      if (error) {
        return <ErrorComponent error={error} />;
      }

      return (
        <Context.Provider value={data.session}>{children}</Context.Provider>
      );
    }}
  </Query>
);

export default {
  Provider: SessionProvider,
  Consumer: Context.Consumer,
};
