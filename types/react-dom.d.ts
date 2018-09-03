import { ReactNode } from 'react';

declare module 'react-dom' {
  interface ReactRoot {
    render(element: ReactNode): void;
  }

  export function unstable_createRoot(element: Element): ReactRoot;
}
