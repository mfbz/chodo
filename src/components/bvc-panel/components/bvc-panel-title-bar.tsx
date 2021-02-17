import React from 'react';
import { BVCLabel } from '../../bvc-label';
import { BVCPanelActionItem } from '../interfaces/bvc-panel-action-item';
import { BVCIconButton } from '../../bvc-icon-button';
import { BVCProgress } from '../../bvc-progress';

export const BVCPanelTitleBar = React.memo(function BVCPanelTitleBar({
  title,
  progress,
  actions,
}: {
  title?: string;
  progress?: number;
  actions?: BVCPanelActionItem[];
}) {
  return (
    <div style={{ width: '100%', height: 60, position: 'relative', background: '#787878' }}>
      <div
        style={{
          width: '100%',
          height: 60,
          borderRadius: '10px 10px 0px 0px',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 100,
        }}>
        <BVCProgress progress={progress} />
      </div>

      <div
        style={{
          width: '100%',
          height: 60,
          display: 'flex',
          flexDirection: 'row',
          justifyItems: 'flex-start',
          alignItems: 'center',
          borderRadius: '10px 10px 0px 0px',
          paddingLeft: 16,
          paddingRight: 16,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 101,
        }}>
        <div style={{ marginRight: 8 }}>{title && <BVCLabel text={title} variant={'header'} inverse={true} />}</div>

        <div style={{ flex: 1 }}></div>

        <div
          style={{
            marginLeft: 8,
            display: 'flex',
            justifyItems: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {actions?.map((action, index) => (
            <BVCIconButton
              icon={action.icon}
              onClick={action.onClick}
              disabled={action.disabled}
              onClickDisabled={action.onClickDisabled}
              size={'small'}
              style={{ marginLeft: 8 }}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
