import { useState, useLayoutEffect } from 'react';

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(() => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowDimensions(() => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height,
        };
      });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
