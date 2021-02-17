import { Alarm } from '../../../interfaces/alarm';
import React, { useMemo } from 'react';
import { BVCIcon } from '../../../../components/bvc-icon';
import { User } from '../../../interfaces/user';

export function useUserButtonIcon(user: User | null) {
  return useMemo(() => {
    if (user) {
      return React.createElement(BVCIcon, { src: require('./../../../../assets/Logout_48x48.png') });
    } else {
      return React.createElement(BVCIcon, { src: require('./../../../../assets/UserResetPin_48x48.png') });
    }
  }, [user]);
}
