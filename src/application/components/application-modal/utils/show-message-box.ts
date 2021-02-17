import { showModal } from '../api/modal-api';
import React from 'react';
import { BVCLabel } from '../../../../components/bvc-label';

export function showMessageBox({
  title,
  message,
  onlyOk,
  okText,
  cancelText,
  onOk,
  onCancel,
}: {
  title: string;
  message: string;
  onlyOk?: boolean;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
}) {
  showModal({
    title,
    onlyOk,
    okText,
    cancelText,
    onOk,
    onCancel,
    footer: true,
    children: React.createElement(BVCLabel, { text: message }),
  });
}
