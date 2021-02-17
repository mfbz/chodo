import React, { useCallback } from 'react';
import { HmiRun } from '../../../wamphooks/procedures/use-procedure-hmimanager-getlaserrunlist';
import { useEditRun } from './use-edit-run';
import { useMaterialArray } from './use-material-array';
import { showModal } from '../../../application';
import { EditRunForm } from '../components/edit-run-form/edit-run-form';
import { setModalComponent } from '../../../application/store/modal';

export function useOnClickRunlistRow(laserId: number) {
  const editRun = useEditRun();
  const materialArray = useMaterialArray();

  return useCallback(
    (run: HmiRun) => {
      showModal({
        title: 'Edit run',
        size: 'large',
        children: React.createElement(EditRunForm, {
          initialValue: run,
          materialArray,
          onEdit: async values => {
            await editRun(laserId, values);
            setModalComponent(null);
          },
        }),
      });
    },
    [laserId, materialArray, editRun],
  );
}
