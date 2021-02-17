import { useCallback } from 'react';
import { showMessageBox } from '../components/application-modal';

export function useShowUserHintModal() {
  return useCallback(() => {
    showMessageBox({
      title: 'Disabled',
      message: "You don't have enough privileges to perform this action.",
      okText: 'Ok',
      onlyOk: true,
    });
  }, []);
}
