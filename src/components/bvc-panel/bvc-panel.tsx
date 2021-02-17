import React from 'react';
import { BVCPanelTitleBar } from './components/bvc-panel-title-bar';
import { BVCPanelTail } from './components/bvc-panel-tail';
import { BVCPanelActionItem } from './interfaces/bvc-panel-action-item';

export const BVCPanel = React.memo(function BVCPanel({
  title,
  hero,
  children,
  progress,
  actions,
  background = '#CDCDCD',
  tail,
  style,
}: {
  title?: string;
  hero?: React.ReactNode;
  children: React.ReactNode;
  progress?: number;
  actions?: BVCPanelActionItem[];
  background?: string;
  tail?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: background,
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #3F3F3F',
        borderRadius: 10,
        ...style,
      }}>
      {(title || progress || actions) && <BVCPanelTitleBar title={title} progress={progress} actions={actions} />}

      {hero && <div style={{ height: 80 }}>{hero}</div>}

      <div style={{ flex: 1, overflowY: 'auto' }}>{children}</div>

      {tail && <BVCPanelTail />}
    </div>
  );
});
