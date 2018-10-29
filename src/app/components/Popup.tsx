import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Popup({ children }: Props) {
  return (
    <>
      {children}
      <span />
    </>
  );
}

export default Popup;
