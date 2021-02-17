import { useCallback } from 'react';
import { callProcedureHmimanagerGetMaterials } from '../../../wamphooks/procedures/use-procedure-hmimanager-getmaterials';

export function useGetMaterialArray() {
  return useCallback(async () => {
    try {
      return await callProcedureHmimanagerGetMaterials().toPromise();
    } catch (e) {
      console.error('An error occurred on GetMaterials:', e);
      return null;
    }
  }, []);
}
