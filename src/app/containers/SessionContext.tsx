import { createContext } from 'react';
import { ApolloQueryResult } from 'apollo-client';

export type Session = {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
};

type Value = {
  session: Session | null;
  resetStore: () => Promise<ApolloQueryResult<any>[] | null>;
};

const SessionContext = createContext<Value>({
  session: null,
  resetStore: () => Promise.resolve(null),
});

SessionContext.Provider.displayName = 'SessionContext.Provider';
SessionContext.Consumer.displayName = 'SessionContext.Consumer';

export default SessionContext;
