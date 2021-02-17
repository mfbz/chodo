import React from 'react';
import { BVCBlockButton } from '../../../../components/bvc-block-button';
import { BVCIcon } from '../../../../components/bvc-icon';
import { useOnLogout } from '../hooks/use-on-logout';

export const ApplicationLogoutButton = React.memo(function ApplicationLogoutButton() {
  const onLogout = useOnLogout();

  return (
    <BVCBlockButton
      icon={<BVCIcon src={require('./../../../../assets/Logout_48x48.png')} />}
      text={'Logout'}
      onClick={onLogout}
    />
  );
});
