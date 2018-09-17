import { Prisma } from 'prisma-binding';
import { ITypeMap } from '../__generated__/resolvers';

export interface TypeMap extends ITypeMap {
  Context: {
    db: Prisma;
    session: {
      iat: number;
      user: any;
    };
  };
}
