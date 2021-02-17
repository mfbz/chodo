import { useCallback } from 'react';
import { callProcedureHmimanagerResetRunlist } from '../../../wamphooks/procedures/use-procedure-hmimanager-resetrunlist';

export function useResetRunlist() {
  return useCallback(async (laserId: number) => {
    try {
      await callProcedureHmimanagerResetRunlist({
        idLaser: laserId,
      }).toPromise();
    } catch (e) {
      console.error('An error occurred on ResetRunlist:', e);
    }
  }, []);
}
