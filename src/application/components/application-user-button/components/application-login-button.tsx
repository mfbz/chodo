import React from 'react';
import { BVCBlockButton } from '../../../../components/bvc-block-button';
import { BVCIcon } from '../../../../components/bvc-icon';
import { useShowLoginModal } from '../hooks/use-show-login-modal';

export const ApplicationLoginButton = React.memo(function ApplicationLoginButton() {
  const showLoginModal = useShowLoginModal();

  return (
    <BVCBlockButton
      icon={<BVCIcon src={require('./../../../../assets/UserResetPin_48x48.png')} />}
      text={'Login'}
      onClick={showLoginModal}
    />
  );
});
