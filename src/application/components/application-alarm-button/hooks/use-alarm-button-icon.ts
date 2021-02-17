import { Alarm } from '../../../interfaces/alarm';
import React, { useMemo } from 'react';
import { BVCIcon } from '../../../../components/bvc-icon';

export function useAlarmButtonIcon(alarms: Alarm[] | null) {
  return useMemo(() => {
    if (alarms?.length) {
      // If at least 1 error return error otherwise the same for warning otherwise info
      if (alarms.some(_alarm => _alarm.messageType === 'error')) {
        return React.createElement(BVCIcon, { src: require('./../../../../assets/SystemIconError_48x48.png') });
      } else if (alarms.some(_alarm => _alarm.messageType === 'warning')) {
        return React.createElement(BVCIcon, { src: require('./../../../../assets/SystemIconWarning_48x48.png') });
      } else {
        return React.createElement(BVCIcon, { src: require('./../../../../assets/SystemIconInformation_48x48.png') });
      }
    } else {
      return React.createElement(BVCIcon, { src: require('./../../../../assets/SystemIconOk_48x48.png') });
    }
  }, [alarms]);
}
