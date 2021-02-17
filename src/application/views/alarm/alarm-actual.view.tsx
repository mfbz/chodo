import React from 'react';
import { AlarmTable } from './components/alarm-table/alarm-table';
import { useCurrentAlarms } from '../../hooks/use-current-alarms';
import { BVCPanel } from '../../../components/bvc-panel';
import { AlarmSolutionsPanel } from './components/alarm-solutions-panel';
import { useAlarmSelection } from './hooks/use-alarm-selection';
import { BVCBlockButton } from '../../../components/bvc-block-button';
import { BVCIcon } from '../../../components/bvc-icon';
import { useAlarmHandler } from '../../hooks/use-alarm-handler';
import { useDisabledByUser } from '../../hooks/use-disabled-by-user';

export const AlarmActualView = React.memo(function AlarmActualView() {
  const alarms = useCurrentAlarms();
  const { onClear } = useAlarmHandler();

  const { onSelectRow, selectedAlarm } = useAlarmSelection();

  const disabled = useDisabledByUser();

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1, height: '100%', marginRight: 8 }}>
        <AlarmTable alarms={alarms} showOccurred={true} selectable={true} onSelectRow={onSelectRow} />
      </div>

      <div style={{ width: 300, height: '100%', marginLeft: 8, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          {selectedAlarm ? (
            <AlarmSolutionsPanel alarm={selectedAlarm} />
          ) : (
            <BVCPanel title={'Solutions'} background={'#FFFFFF'}>
              <div style={{ width: '100%', height: '100%', padding: 16 }}></div>
            </BVCPanel>
          )}
        </div>

        <div style={{ marginTop: 16 }}>
          <BVCBlockButton
            icon={<BVCIcon src={require('./../../../assets/Reset_48x48.png')} />}
            text={'Reset'}
            disabled={disabled}
            onClick={onClear}
          />
        </div>
      </div>
    </div>
  );
});
