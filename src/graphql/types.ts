import { Prisma } from './generated/prisma-client';

export interface Context {
  db: Prisma;
  session: {
    iat: number;
    user: any;
  };
}
