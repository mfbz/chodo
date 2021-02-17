import React, { useCallback } from 'react';
import { DeviceOptions } from '../../main/interfaces/device-options';
import { useRunlist } from './hooks/use-runlist';
import { RunlistTable } from './components/runlist-table';
import { RunlistPanelAction } from './components/runlist-panel-action';
import { useRunlistActions } from './hooks/use-runlist-actions';
import { useDisabledByUser, useStandaloneByWorkmode, useDisabledByDeviceRunning } from '../../application';
import { useOnClickRunlistRow } from './hooks/use-on-click-runlist-row';
import { useShowLoginModal } from '../../application/components/application-user-button';
import { useShowDeviceRunningHintModal } from '../../application/hooks/use-show-device-running-hint-modal';

export const RunlistView = React.memo(function RunlistView({
  laserId,
  options,
}: {
  laserId: number;
  options: DeviceOptions;
}) {
  const disabledByUser = useDisabledByUser();
  const disabledByDeviceRunning = useDisabledByDeviceRunning();
  const standalone = useStandaloneByWorkmode(options.workMode);

  // Create on click disabled depending on if it's disabled by the user of by device
  const showLoginModal = useShowLoginModal();
  const showDeviceRunningHintModal = useShowDeviceRunningHintModal();
  const showDisabledHintModal = useCallback(() => {
    if (disabledByUser) {
      showLoginModal();
      return;
    }
    if (disabledByDeviceRunning) {
      showDeviceRunningHintModal();
      return;
    }
  }, [disabledByUser, disabledByDeviceRunning, showLoginModal, showDeviceRunningHintModal]);

  const runlist = useRunlist(laserId);
  const onClickRunlistRow = useOnClickRunlistRow(laserId);

  const actions = useRunlistActions({
    laserId,
    disabled: disabledByUser || disabledByDeviceRunning,
    onClickDisabled: showDisabledHintModal,
  });

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1, height: '100%' }}>
        <RunlistTable
          runlist={runlist}
          clickable={standalone && !(disabledByUser || disabledByDeviceRunning)}
          onClickRow={onClickRunlistRow}
        />
      </div>

      {standalone && (
        <div style={{ width: 300, height: '100%', marginLeft: 16, display: 'flex', flexDirection: 'column' }}>
          <RunlistPanelAction actions={actions} />
        </div>
      )}
    </div>
  );
});
