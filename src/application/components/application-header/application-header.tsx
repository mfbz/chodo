import React from 'react';
import { BVCRoundWrapper } from '../../../components/bvc-round-wrapper';
import { Space } from 'antd';
import { BVCIconButton } from '../../../components/bvc-icon-button';
import { BVCIcon } from '../../../components/bvc-icon';
import { useNavigation } from './hooks/use-navigation';
import { ApplicationCycleButton } from '../application-cycle-button';
import { ApplicationNotch } from '../application-notch';
import { ApplicationAlarmButton } from '../application-alarm-button';
import { ApplicationUserButton } from '../application-user-button';
import { useFavoriteRoutes } from './hooks/use-favorite-routes';

export const ApplicationHeader = React.memo(function ApplicationHeader({}: {}) {
  // Url to navigate through pages
  const { navigateToHome, navigateToMenu, navigateToManual, navigateToUrl } = useNavigation();
  // Get favorite routes to be displayed near 3 main buttons on the left
  const favoriteRoutes = useFavoriteRoutes();

  return (
    <div style={{ width: '100%', height: 80 }}>
      <BVCRoundWrapper>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyItems: 'center',
            alignItems: 'center',
            paddingLeft: 8,
            paddingRight: 8,
          }}>
          <div>
            <Space>
              <BVCIconButton
                icon={<BVCIcon src={require('./../../../assets/Home_48x48.png')} />}
                onClick={navigateToHome}
              />
              <BVCIconButton
                icon={<BVCIcon src={require('./../../../assets/Module_48x48.png')} />}
                onClick={navigateToMenu}
              />
              <BVCIconButton
                icon={<BVCIcon src={require('./../../../assets/StartManualMode_48x48.png')} />}
                onClick={navigateToManual}
              />
            </Space>
          </div>

          <div style={{ flex: 1, paddingLeft: 8, paddingRight: 8 }}>
            <ApplicationNotch />
          </div>

          <div>
            <Space>
              <ApplicationCycleButton />

              {favoriteRoutes.map((favoriteRoute, index) => (
                <BVCIconButton icon={favoriteRoute.icon} onClick={() => navigateToUrl(favoriteRoute.url)} key={index} />
              ))}

              <ApplicationAlarmButton />
              <ApplicationUserButton />
            </Space>
          </div>
        </div>
      </BVCRoundWrapper>
    </div>
  );
});
