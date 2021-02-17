import { useCallback } from 'react';
import { callProcedureHmimanagerEditRun } from '../../../wamphooks/procedures/use-procedure-hmimanager-editrun';
import { HmiRun } from '../../../wamphooks/procedures/use-procedure-hmimanager-getlaserrunlist';
import { useCurrentUser } from '../../../application';
import { convertLength } from '../../../components/bvc-length-label';

export function useEditRun() {
  const { measurementSystem } = useCurrentUser();

  return useCallback(
    async (laserId: number, run: HmiRun) => {
      const _run = { ...run };

      // If imperial system convert needed unit of measure
      // Because they will be inputted with that measurement system
      if (measurementSystem === 'imperial') {
        _run.length = convertLength(_run.length, 'imperial', 'metric');
        _run.width = convertLength(_run.width, 'imperial', 'metric');
        _run.thickness = convertLength(_run.thickness, 'imperial', 'metric');
      }

      try {
        await callProcedureHmimanagerEditRun({
          idLaser: laserId,
          run: _run,
        }).toPromise();
      } catch (e) {
        console.error('An error occurred on EditRun:', e);
      }
    },
    [measurementSystem],
  );
}
