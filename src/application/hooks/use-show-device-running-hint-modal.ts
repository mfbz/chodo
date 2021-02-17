import { useCallback } from 'react';
import { showMessageBox } from '../components/application-modal';

export function useShowDeviceRunningHintModal() {
  return useCallback(() => {
    showMessageBox({
      title: 'Disabled',
      message: "You can't perform this action while the machine is in automatic mode.",
      okText: 'Ok',
      onlyOk: true,
    });
  }, []);
}
