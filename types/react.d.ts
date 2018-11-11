import { ComponentType } from 'react';

declare module 'react' {
  export const ConcurrentMode: ComponentType<{}>;
}
