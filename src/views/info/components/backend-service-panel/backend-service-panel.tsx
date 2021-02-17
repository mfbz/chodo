import React from 'react';
import { BackendService } from '../../interfaces/backend-service';
import { BackendServiceGrid } from './components/backend-service-grid';
import { BVCPanel } from '../../../../components/bvc-panel';

export const BackendServicePanel = React.memo(function BackendServicePanel({
  services,
  disabled,
  onClickDisabled,
}: {
  services: BackendService[] | null;
  disabled?: boolean;
  onClickDisabled?: () => void;
}) {
  return (
    <BVCPanel title={'Backend services'} background={'#FFFFFF'}>
      <div style={{ width: '100%', height: '100%', padding: 16 }}>
        <BackendServiceGrid services={services} disabled={disabled} onClickDisabled={onClickDisabled} />
      </div>
    </BVCPanel>
  );
});
