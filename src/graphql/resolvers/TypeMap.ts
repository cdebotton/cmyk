import { Prisma } from 'prisma-binding';
import { ITypeMap } from '../__generated__/resolvers';

export interface Context {
  db: Prisma;
  session: {
    iat: number;
    user: any;
  };
}

export interface TypeMap extends ITypeMap {
  Context: Context;
}
