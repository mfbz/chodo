import React from 'react';
import { BVCPanel } from '../../../../../components/bvc-panel';
import { User } from '../../../../interfaces/user';
import { UserPanelContentWrapper } from './components/user-panel-content-wrapper';
import { Language } from '../../../../interfaces/language';

export const UserPanel = React.memo(function UserPanel({
  user,
  languages,
  onEdit,
}: {
  user?: User | null;
  languages: Language[] | null;
  onEdit: (user: User) => void;
}) {
  return (
    <BVCPanel title={'User data'} background={'#FFFFFF'}>
      <div style={{ width: '100%', height: '100%', padding: 16 }}>
        <UserPanelContentWrapper user={user} languages={languages} onEdit={onEdit} />
      </div>
    </BVCPanel>
  );
});
