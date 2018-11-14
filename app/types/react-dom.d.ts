import ReactDOM from 'react-dom';
import { ReactElement } from 'react';

declare module 'react-dom' {
  type Resource = {
    render: (node: ReactElement<any>) => void;
  };
  export function createRoot(element: HTMLElement | null): Resource;
}
