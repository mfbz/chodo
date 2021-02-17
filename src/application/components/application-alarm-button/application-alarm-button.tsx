import React from 'react';
import { BVCDropdownButton } from '../../../components/bvc-dropdown-button';
import { BVCIcon } from '../../../components/bvc-icon';
import { BVCIconButton } from '../../../components/bvc-icon-button';
import { useCurrentAlarms } from '../../hooks/use-current-alarms';
import { useDisabledByUser } from '../../hooks/use-disabled-by-user';
import { AlarmTable } from '../../views/alarm/components/alarm-table/alarm-table';
import { useAlarmButtonDimensions } from './hooks/use-alarm-button-dimensions';
import { useAlarmButtonIcon } from './hooks/use-alarm-button-icon';
import { useNavigateToAlarms } from './hooks/use-navigate-to-alarms';
import { useOnClearAlarms } from './hooks/use-on-clear-alarms';
import { useShowLoginModal } from '../application-user-button';

export const ApplicationAlarmButton = React.memo(function ApplicationAlarmButton() {
  const { width, height } = useAlarmButtonDimensions();

  const alarms = useCurrentAlarms();
  const navigateToAlarms = useNavigateToAlarms();

  const onClearAlarms = useOnClearAlarms();
  const icon = useAlarmButtonIcon(alarms);

  const disabled = useDisabledByUser();

  // Show login modal if disabled
  const showLoginModal = useShowLoginModal();

  return (
    <BVCDropdownButton icon={icon}>
      <div style={{ width: width, height: height, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, background: '#FFFFFF' }}>
          <div style={{ width: '100%', height: height - 80 }}>
            <AlarmTable alarms={alarms} onClickRow={navigateToAlarms} />
          </div>
        </div>

        <div
          style={{
            height: 80,
            display: 'flex',
            flexDirection: 'row',
            justifyItems: 'center',
            alignItems: 'center',
            paddingLeft: 8,
            paddingRight: 8,
          }}>
          <div style={{ flex: 1 }}></div>

          <div>
            <BVCIconButton
              icon={<BVCIcon src={require('./../../../assets/Reset_48x48.png')} />}
              disabled={disabled}
              onClick={onClearAlarms}
              onClickDisabled={showLoginModal}
            />
          </div>
        </div>
      </div>
    </BVCDropdownButton>
  );
});
