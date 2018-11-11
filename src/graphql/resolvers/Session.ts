import { SessionResolvers } from '../generated/graphqlgen';

const Session: SessionResolvers.Type = {
  ...SessionResolvers.defaultResolvers,
};

export default Session;
