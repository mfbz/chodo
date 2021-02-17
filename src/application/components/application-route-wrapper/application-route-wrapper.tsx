import React from 'react';
import { Route } from '../../interfaces/route';
import { BVCPanel } from '../../../components/bvc-panel';
import useDimensions from 'react-cool-dimensions';

export const ApplicationRouteWrapper = React.memo(function ApplicationRouteWrapper({ route }: { route: Route }) {
  const { ref, height } = useDimensions();

  return (
    <BVCPanel title={route.fullscreen ? undefined : route.title} tail={true}>
      <div
        ref={ref as any}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <div style={{ width: '100%', height: height, overflowY: 'auto' }}>{route.component}</div>
      </div>
    </BVCPanel>
  );
});
