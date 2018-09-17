import { SessionResolvers } from '../__generated__/resolvers';
import { TypeMap } from './TypeMap';

const Session: SessionResolvers.Type<TypeMap> = {
  iat: parent => parent.iat,
  user: parent => parent.user,
};

export default Session;
