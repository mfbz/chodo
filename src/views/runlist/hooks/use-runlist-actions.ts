import { useEditRun } from './use-edit-run';
import { useResetRunlist } from './use-reset-runlist';
import { useMemo, useCallback } from 'react';
import React from 'react';
import { showModal } from '../../../application';
import { EditRunForm } from '../components/edit-run-form/edit-run-form';
import { setModalComponent } from '../../../application/store/modal';
import { BVCIcon } from '../../../components/bvc-icon';
import { useMaterialArray } from './use-material-array';

export function useRunlistActions({
  laserId,
  disabled,
  onClickDisabled,
}: {
  laserId: number;
  disabled?: boolean;
  onClickDisabled?: () => void;
}) {
  const editRun = useEditRun();
  const resetRunlist = useResetRunlist();

  const materialArray = useMaterialArray();

  const showAddRunModal = useCallback(() => {
    showModal({
      title: 'Add run',
      size: 'large',
      children: React.createElement(EditRunForm, {
        materialArray,
        onEdit: async values => {
          await editRun(laserId, values);
          setModalComponent(null);
        },
      }),
    });
  }, [laserId, materialArray, editRun]);

  const onResetRunlist = useCallback(() => resetRunlist(laserId), [laserId, resetRunlist]);

  return useMemo(
    () => [
      {
        icon: React.createElement(BVCIcon, { src: require('./../../../assets/AddEntry_48x48.png') }),
        text: 'Add run',
        disabled: disabled,
        onClick: showAddRunModal,
        onClickDisabled,
      },
      {
        icon: React.createElement(BVCIcon, { src: require('./../../../assets/Reset_48x48.png') }),
        text: 'Reset runlist',
        disabled: disabled,
        showConfirm: true,
        onClick: onResetRunlist,
        onClickDisabled,
      },
    ],
    [disabled, showAddRunModal, onResetRunlist, onClickDisabled],
  );
}
