import { useOnLogin } from './use-on-login';
import { setModalComponent } from '../../../store/modal';
import { useCallback } from 'react';
import { showModal } from '../../application-modal';
import React from 'react';
import { ApplicationLoginForm } from '../components/application-login-form';

export function useShowLoginModal() {
  const onLogin = useOnLogin({ onSuccess: () => setModalComponent(null) });

  return useCallback(() => {
    showModal({ title: 'Login', children: React.createElement(ApplicationLoginForm, { onLogin }) });
  }, [onLogin]);
}
