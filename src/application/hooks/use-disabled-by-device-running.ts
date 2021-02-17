import { useMemo } from 'react';
import { useDeviceRunning } from './use-device-running';

export function useDisabledByDeviceRunning() {
  const running = useDeviceRunning();

  return useMemo(() => {
    return running !== null && running;
  }, [running]);
}
