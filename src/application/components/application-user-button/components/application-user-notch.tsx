import React, { useMemo } from 'react';
import { User } from '../../../interfaces/user';
import { BVCLabel } from '../../../../components/bvc-label';

export const ApplicationUserNotch = React.memo(function ApplicationUserNotch({ user }: { user: User | null }) {
  const fullname = useMemo(() => {
    if (user) {
      return `${user.lastname} ${user.firstname}`;
    }
    return 'No user';
  }, [user]);

  return (
    <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 16 }}>
      <BVCLabel text={fullname} variant={'header'} />
    </div>
  );
});
