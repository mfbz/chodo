import React from 'react';
import { BackendService } from '../../../interfaces/backend-service';
import { BVCGrid } from '../../../../../components/bvc-grid';
import { BackendServiceGridItem } from './backend-service-grid-item';

export const BackendServiceGrid = React.memo(function BackendServiceGrid({
  services,
  disabled,
  onClickDisabled,
}: {
  services: BackendService[] | null;
  disabled?: boolean;
  onClickDisabled?: () => void;
}) {
  return (
    <div style={{ width: '100%', height: '100%', padding: 16 }}>
      <BVCGrid
        columns={4}
        data={services || []}
        renderItem={(item: BackendService) => (
          <BackendServiceGridItem service={item} disabled={disabled} onClickDisabled={onClickDisabled} />
        )}
      />
    </div>
  );
});
