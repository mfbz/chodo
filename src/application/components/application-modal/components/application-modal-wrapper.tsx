import React from 'react';
import { BVCPanel } from '../../../../components/bvc-panel';
import { BVCTextButton } from '../../../../components/bvc-text-button';
import { useModalPosition } from '../hooks/use-modal-position';
import { useModalDimensions } from '../hooks/use-modal-dimensions';
import { useModalActions } from '../hooks/use-modal-actions';

export const ApplicationModalWrapper = React.memo(function ApplicationModalWrapper({
  title,
  children,
  footer,
  onlyOk,
  okText,
  cancelText,
  size = 'normal',
  onOk,
  onCancel,
}: {
  title: string;
  children: React.ReactNode;
  footer?: boolean;
  onlyOk?: boolean;
  okText?: string;
  cancelText?: string;
  size?: 'normal' | 'large';
  onOk: () => void;
  onCancel: () => void;
}) {
  const actions = useModalActions({ onCancel });

  const { width, minHeight, maxHeight } = useModalDimensions(size);
  const { ref, top, left } = useModalPosition();

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
      <div
        onClick={onCancel}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.75,
          background: '#FFFFFF',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      />

      <div
        style={{
          width: width,
          maxHeight: maxHeight,
          position: 'absolute',
          top: top,
          left: left,
          zIndex: 1000,
        }}
        ref={ref as any}>
        <BVCPanel title={title} background={'#FFFFFF'} actions={actions}>
          <div style={{ padding: 16 }}>{children}</div>

          {footer && (
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
              <div style={{ flex: 1, marginRight: onlyOk ? 0 : 8 }}>
                <BVCTextButton text={okText || 'Ok'} onClick={onOk} />
              </div>

              {!onlyOk && (
                <div style={{ flex: 1, marginLeft: 8 }}>
                  <BVCTextButton text={cancelText || 'Cancel'} onClick={onCancel} />
                </div>
              )}
            </div>
          )}
        </BVCPanel>
      </div>
    </div>
  );
});
