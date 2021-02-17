import React from 'react';
import { BVCDropdownButton } from '../../../components/bvc-dropdown-button';
import { useUserButtonIcon } from './hooks/use-user-button-icon';
import { useCurrentUser } from '../../hooks/use-current-user';
import { ApplicationUserNotch } from './components/application-user-notch';
import { ApplicationUserActionWrapper } from './components/application-user-action-wrapper';

export const ApplicationUserButton = React.memo(function ApplicationUserButton() {
  const { user } = useCurrentUser();
  const icon = useUserButtonIcon(user);

  return (
    <BVCDropdownButton icon={icon}>
      <div style={{ minWidth: 300, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, background: '#FFFFFF' }}>
          <div style={{ width: '100%' }}>
            <ApplicationUserNotch user={user} />
          </div>
        </div>

        <div
          style={{
            width: '100%',
            height: 80,
            display: 'flex',
            flexDirection: 'row',
            justifyItems: 'flex-end',
            alignItems: 'center',
            paddingLeft: 8,
            paddingRight: 8,
          }}>
          <div style={{ flex: 1 }}></div>

          <div style={{ width: 300 }}>
            <ApplicationUserActionWrapper user={user} />
          </div>
        </div>
      </div>
    </BVCDropdownButton>
  );
});
