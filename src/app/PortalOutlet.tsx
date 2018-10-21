import React from 'react';
import { createPortal } from 'react-dom';
import PortalManager from './containers/PortalManager';

function PortalOutlet() {
  return (
    <PortalManager.Consumer>
      {({ element, portalNode }) => {
        if (element && portalNode) {
          return createPortal(portalNode, element);
        }
      }}
    </PortalManager.Consumer>
  );
}

export default PortalOutlet;
