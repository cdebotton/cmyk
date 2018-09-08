import React, { ReactNode } from 'react';

interface IProps<T> {
  trigger: ReactNode;
}

function Popover<T>({ trigger }: IProps<T>) {
  return <>{trigger}</>;
}

export default Popover;
