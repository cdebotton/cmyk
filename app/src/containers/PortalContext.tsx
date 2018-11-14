import { createContext, ReactNode } from 'react';

interface State {
  portalNode: ReactNode;
  setPortalNode: (node: ReactNode) => void;
}

const PortalContext = createContext<State>({
  portalNode: null,
  setPortalNode: () => undefined,
});

export default PortalContext;
