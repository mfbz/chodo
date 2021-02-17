import { useCallback } from 'react';
import { useAlarmHandler } from '../../../hooks/use-alarm-handler';

export function useOnClearAlarms() {
  const { onClear } = useAlarmHandler();

  return useCallback(async () => {
    if (onClear) {
      try {
        onClear();
      } catch (e) {
        console.error('An error occurred on onClearAlarms:', e);
      }
    }
  }, [onClear]);
}
