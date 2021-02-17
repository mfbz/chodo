import { useEffect, useState, useMemo } from 'react';
import { getDeviceRunning$ } from '../store/device';

export function useDeviceRunning() {
  const [running, setRunning] = useState<boolean | null>(null);

  useEffect(() => {
    const subscription = getDeviceRunning$().subscribe(_running => {
      setRunning(_running);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return running;
}
