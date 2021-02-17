import { useCallback } from 'react';
import { callProcedureHmimanagerGetVersion } from '../../../wamphooks/procedures/use-procedure-hmimanager-getversion';

export function useGetBackendServiceArray() {
  return useCallback(async () => {
    try {
      return await callProcedureHmimanagerGetVersion().toPromise();
    } catch (e) {
      console.error('An error occurred on GetBackendServices:', e);
      return null;
    }
  }, []);
}
