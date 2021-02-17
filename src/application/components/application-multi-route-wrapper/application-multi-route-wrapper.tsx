import React from 'react';
import { MultiRoute } from '../../interfaces/route';
import { BVCPanel } from '../../../components/bvc-panel';
import { ApplicationTabMenu } from './components/application-tab-menu';
import { ApplicationTabMenuItem } from './components/application-tab-menu-item';
import { useCurrentRoute } from '../../hooks/use-current-route';
import { useNavigateToUrl } from '../../hooks/use-navigate-to-url';
import useDimensions from 'react-cool-dimensions';

export const ApplicationMultiRouteWrapper = React.memo(function ApplicationMultiRouteWrapper({
  multiRoute,
}: {
  multiRoute: MultiRoute;
}) {
  const { ref, height } = useDimensions();

  const currentRoute = useCurrentRoute();
  const navigateToUrl = useNavigateToUrl();

  return (
    <BVCPanel title={currentRoute?.title || 'Not found'} tail={true} background={'#3F3F3F'}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', padding: '4px 2px 4px 2px' }}>
        <ApplicationTabMenu>
          {multiRoute.routes.map(route => (
            <ApplicationTabMenuItem
              icon={route.icon}
              text={route.title}
              selected={route.url === currentRoute?.url}
              onClick={() => navigateToUrl(multiRoute.url + route.url)}
              key={route.url}
            />
          ))}
        </ApplicationTabMenu>

        <div
          ref={ref as any}
          style={{
            flex: 1,
            height: '100%',
            background: '#CDCDCD',
            borderRadius: 10,
            padding: 10,
            marginLeft: -1,
          }}>
          <div style={{ width: '100%', height: height, overflowY: 'auto' }}>{currentRoute?.component}</div>
        </div>
      </div>
    </BVCPanel>
  );
});
