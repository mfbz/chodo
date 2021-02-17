import { useModule } from './use-module';
import { useMemo } from 'react';

export function useAlarmHandler() {
  const module = useModule();

  return useMemo(() => ({ onClear: module?.alarmHandler?.onClear }), [module]);
}
