import { ComponentType, ReactNode } from 'react';

declare module 'react' {
  export const Placeholder: ComponentType<{
    delayMs?: number;
    fallback: ReactNode;
  }>;
}
