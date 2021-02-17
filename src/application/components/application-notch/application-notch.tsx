import React from 'react';
import { BVCRoundWrapper } from '../../../components/bvc-round-wrapper';
import { BVCLabel } from '../../../components/bvc-label';
import { useCurrentTitle } from './hooks/use-current-title';

export const ApplicationNotch = React.memo(function ApplicationNotch({}: {}) {
  const title = useCurrentTitle();

  return (
    <div style={{ width: '100%', height: 56 }}>
      <BVCRoundWrapper
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <BVCLabel text={title} variant={'header'} inverse={true} />
      </BVCRoundWrapper>
    </div>
  );
});
