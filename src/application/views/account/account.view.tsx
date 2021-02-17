import React, { useCallback, useState } from 'react';
import { UserPanel } from './components/user-panel';
import { useCurrentUser } from '../../hooks/use-current-user';
import { useOnUpdatedUser } from './hooks/use-on-update-user';
import { useLanguages } from './hooks/use-languages';
import { User } from '../../interfaces/user';
import { showModal, LoginErrorCode } from '../..';
import { setModalComponent } from '../../store/modal';
import { InsertPasswordForm } from './components/insert-password-form';

export const AccountView = React.memo(function AccountView() {
  const { user } = useCurrentUser();

  // Get the available languages from the backend
  const languages = useLanguages();

  // Error code to be used to display an additional error box inside the form
  const onUpdateUser = useOnUpdatedUser({ onSuccess: () => setModalComponent(null) });
  const showEditModal = useCallback(
    (user: User) => {
      showModal({
        title: 'Confirm user update',
        children: React.createElement(InsertPasswordForm, {
          onUpdate: async password => {
            return await onUpdateUser(user, password);
          },
        }),
      });
    },
    [onUpdateUser],
  );

  return (
    <div style={{ width: '100%', height: '100%', padding: 16 }}>
      <UserPanel user={user} languages={languages} onEdit={showEditModal} />
    </div>
  );
});
