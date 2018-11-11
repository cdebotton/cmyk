import { Prisma } from './__generated__/prisma-client';

export interface Context {
  db: Prisma;
  session: {
    iat: number;
    user: any;
  };
}
