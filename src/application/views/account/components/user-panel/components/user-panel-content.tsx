import React from 'react';
import { User } from '../../../../../interfaces/user';
import { Language } from '../../../../../interfaces/language';
import { EditUserForm } from '../../edit-user-form';

export const UserPanelContent = React.memo(function UserPanelContent({
  user,
  languages,
  onEdit,
}: {
  user: User;
  languages: Language[];
  onEdit: (user: User) => void;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 16,
      }}>
      <EditUserForm initialValue={user} languages={languages} onEdit={onEdit} />
    </div>
  );
});
