import React, { ComponentType, ReactNode } from 'react';
import componentFetcher from '../utils/componentFetcher';

type Props<P> = {
  children?: ReactNode;
  loader: () => Promise<{ default: ComponentType<P> }>;
} & P;

function DynamicComponent<P>(props: Props<P>) {
  const Component = componentFetcher(props.loader);

  return <Component {...props} />;
}

export default DynamicComponent;
