import React from 'react';
import { List } from 'antd';
import { BackendService } from '../../../interfaces/backend-service';
import { BVCPanel } from '../../../../../components/bvc-panel';
import { BVCLabel } from '../../../../../components/bvc-label';

export const BackendServiceGridItem = React.memo(function BackendServiceGridItem({
  service,
  disabled,
  onClickDisabled,
}: {
  service: BackendService;
  disabled?: boolean;
  onClickDisabled?: () => void;
}) {
  return (
    <List.Item>
      <BVCPanel background={'#FFFFFF'}>
        <div style={{ width: '100%', height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
          <BVCLabel text={'Name'} strong={true} />
          <BVCLabel text={service.name} translate={false} />

          <BVCLabel text={'Enabled'} strong={true} style={{ marginTop: 16 }} />
          <BVCLabel text={service.enable ? 'True' : 'False'} translate={false} />

          <BVCLabel text={'Version'} strong={true} style={{ marginTop: 16 }} />
          <BVCLabel text={service.installedVersion} translate={false} />
        </div>
      </BVCPanel>
    </List.Item>
  );
});
