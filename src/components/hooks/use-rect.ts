import { useMemo, useRef, useState, useLayoutEffect } from 'react';

export function useRect() {
  const ref = useRef<HTMLElement>();

  const [rect, setRect] = useState({ top: 0, right: 0, left: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0 });

  useLayoutEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    };
    window.addEventListener('resize', handleResize);

    // Call it one time for initialization
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return useMemo(() => ({ ref, rect }), [ref, rect]);
}
