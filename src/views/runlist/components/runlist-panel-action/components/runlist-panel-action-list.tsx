import React from 'react';
import { RunlistActionItem } from '../interfaces/runlist-action-item';
import { RunlistPanelActionListItem } from './runlist-panel-action-list-item';
import { BVCList } from '../../../../../components/bvc-list';

export const RunlistPanelActionList = React.memo(function RunlistPanelActionList({
  actions,
}: {
  actions: RunlistActionItem[];
}) {
  return <BVCList data={actions} renderItem={item => <RunlistPanelActionListItem item={item} />} />;
});
