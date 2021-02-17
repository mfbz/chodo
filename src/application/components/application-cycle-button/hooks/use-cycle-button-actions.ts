import { useDeviceHandler } from '../../../hooks/use-device-handler';
import { useCallback } from 'react';

export function useCycleButtonActions() {
  const { onStart, onStop } = useDeviceHandler();

  const _onStart = useCallback(async () => {
    if (onStart) {
      try {
        onStart();
      } catch (e) {
        console.error('An error occurred on onStart:', e);
      }
    }
  }, [onStart]);

  const _onStop = useCallback(async () => {
    if (onStop) {
      try {
        onStop();
      } catch (e) {
        console.error('An error occurred on onStop:', e);
      }
    }
  }, [onStop]);

  return { onStart: _onStart, onStop: _onStop };
}
