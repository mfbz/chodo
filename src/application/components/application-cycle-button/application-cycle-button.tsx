import React, { useCallback } from 'react';
import { BVCIcon } from '../../../components/bvc-icon';
import { BVCIconButton } from '../../../components/bvc-icon-button';
import { useDeviceRunning } from '../../hooks/use-device-running';
import { useDisabledByUser } from '../../hooks/use-disabled-by-user';
import { useCycleButtonActions } from './hooks/use-cycle-button-actions';
import { useShowLoginModal } from '../application-user-button';
import { showMessageBox } from '../..';

export const ApplicationCycleButton = React.memo(function ApplicationCycleButton({}: {}) {
  const running = useDeviceRunning();
  const { onStart, onStop } = useCycleButtonActions();

  const disabled = useDisabledByUser();
  // Show login modal if disabled
  const showLoginModal = useShowLoginModal();

  // Show a dialog to confirm the action
  const onClick = useCallback(() => {
    showMessageBox({
      title: 'Confirm action',
      message: 'Do you confirm to execute this action?',
      okText: 'Confirm',
      onOk: () => {
        if (running) {
          onStop();
        } else {
          onStart();
        }
      },
    });
  }, [running, onStart, onStop]);

  return (
    <BVCIconButton
      icon={
        running ? (
          <BVCIcon src={require('./../../../assets/Stop_48x48.png')} />
        ) : (
          <BVCIcon src={require('./../../../assets/Start_48x48.png')} />
        )
      }
      disabled={disabled}
      onClick={onClick}
      onClickDisabled={showLoginModal}
    />
  );
});
