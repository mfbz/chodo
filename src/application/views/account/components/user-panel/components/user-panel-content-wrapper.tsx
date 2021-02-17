import React from 'react';
import { User } from '../../../../../interfaces/user';
import { BVCLabel } from '../../../../../../components/bvc-label';
import { UserPanelContent } from './user-panel-content';
import { Language } from '../../../../../interfaces/language';

export const UserPanelContentWrapper = React.memo(function UserPanelContentWrapper({
  user,
  languages,
  onEdit,
}: {
  user?: User | null;
  languages: Language[] | null;
  onEdit: (user: User) => void;
}) {
  if (user && languages) {
    return <UserPanelContent user={user} languages={languages} onEdit={onEdit} />;
  } else {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BVCLabel text={'No data'} variant={'header'} />
        </div>
      </div>
    );
  }
});
