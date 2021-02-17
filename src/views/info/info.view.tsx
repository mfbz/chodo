import React from 'react';
import { DeviceOptions } from '../../main/interfaces/device-options';
import { useBackendServiceArray } from './hooks/use-backend-service-array';
import { BackendServicePanel } from './components/backend-service-panel';
import { BVCPanel } from '../../components/bvc-panel';
import { BVCLabel } from '../../components/bvc-label';

export const InfoView = React.memo(function InfoView({ options }: { options: DeviceOptions }) {
  const version = process.env.REACT_APP_VERSION;

  const services = useBackendServiceArray();

  return (
    <div style={{ width: '100%', height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
      <div>
        <BVCPanel title={'Hmi App'} background={'#FFFFFF'}>
          <div style={{ width: '100%', height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <BVCLabel text={'Version'} strong={true} />
            <BVCLabel text={version || '-'} translate={false} />
          </div>
        </BVCPanel>
      </div>

      <div style={{ marginTop: 16 }}>
        <BackendServicePanel services={services} />
      </div>
    </div>
  );
});
