import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import PortalContext from './containers/PortalContext';

const portal = document.getElementById('portal');

function PortalOutlet() {
  const { portalNode } = useContext(PortalContext);

  if (portal && portalNode) {
    return createPortal(portalNode, portal);
  }

  return null;
}

export default PortalOutlet;
