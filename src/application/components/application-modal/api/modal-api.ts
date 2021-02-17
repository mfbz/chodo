import { setModalComponent } from '../../../store/modal';
import React from 'react';
import { ApplicationModalWrapper } from '../components/application-modal-wrapper';

export function showModal({
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
  onOk?: () => void;
  onCancel?: () => void;
}) {
  // Set modal component and add closing methods after actions are executed
  setModalComponent(
    React.createElement(ApplicationModalWrapper, {
      title,
      children,
      footer,
      onlyOk,
      okText,
      cancelText,
      size,
      onOk: () => {
        if (onOk) {
          onOk();
        }
        // To close automatically after execution
        setModalComponent(null);
      },
      onCancel: () => {
        if (onCancel) {
          onCancel();
        }
        // To close automatically after execution
        setModalComponent(null);
      },
    }),
  );
}
