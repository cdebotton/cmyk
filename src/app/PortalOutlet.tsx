import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import PortalManager from './containers/PortalManager';

function PortalOutlet() {
  const { element, portalNode } = useContext(PortalManager.Context);

  if (element && portalNode) {
    return createPortal(portalNode, element);
  }

  return null;
}

export default PortalOutlet;
