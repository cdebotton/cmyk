import { useState, useEffect } from 'react';

function useViewport() {
  function getViewport() {
    return {
      bottom: window.pageYOffset + window.innerHeight,
      top: window.pageYOffset,
    };
  }

  const [viewport, setViewport] = useState(() => {
    return getViewport();
  });

  function handleResize() {
    setViewport(getViewport());
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  });

  return viewport;
}

export default useViewport;
