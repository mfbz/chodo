import React from 'react';
import { BVCPanel } from '../../../../components/bvc-panel';
import { RunlistActionItem } from './interfaces/runlist-action-item';
import { RunlistPanelActionList } from './components/runlist-panel-action-list';

export const RunlistPanelAction = React.memo(function RunlistPanelAction({
  actions,
}: {
  actions: RunlistActionItem[];
}) {
  return (
    <BVCPanel title={'Actions'} background={'#FFFFFF'}>
      <div style={{ width: '100%', height: '100%', padding: 16 }}>
        <RunlistPanelActionList actions={actions} />
      </div>
    </BVCPanel>
  );
});
