import React from 'react';
import { BVCIcon } from '../../../../../../components/bvc-icon';

export const AlarmIcon = React.memo(function AlarmIcon({ type }: { type: 'warning' | 'error' | 'info' }) {
  switch (type) {
    case 'warning':
      return <BVCIcon src={require('./../../../../../../assets/SystemIconWarning_48x48.png')} />;
    case 'error':
      return <BVCIcon src={require('./../../../../../../assets/SystemIconError_48x48.png')} />;
    case 'info':
      return <BVCIcon src={require('./../../../../../../assets/SystemIconInformation_48x48.png')} />;
    default:
      return null;
  }
});
