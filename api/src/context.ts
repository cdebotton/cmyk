import { Prisma } from './resolvers/types/prisma-client';

export interface Context {
  db: Prisma;
  session: {
    iat: number;
    user: any;
  };
}
