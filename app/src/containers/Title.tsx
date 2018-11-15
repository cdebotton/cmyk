import { useEffect } from 'react';

interface Props {
  children: string | string[];
}

function Title({ children }: Props) {
  useEffect(
    () => {
      document.title = Array.isArray(children) ? children.join(' ') : children;
    },
    [children],
  );

  return null;
}

export default Title;
