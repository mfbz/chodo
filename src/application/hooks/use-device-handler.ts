import { useModule } from './use-module';
import { useMemo } from 'react';

export function useDeviceHandler() {
  const module = useModule();

  return useMemo(() => ({ onStart: module?.deviceHandler?.onStart, onStop: module?.deviceHandler?.onStop }), [module]);
}
