import React, { useMemo } from 'react';
import { BVCIcon } from '../../../../components/bvc-icon';

export function useModalActions({ onCancel }: { onCancel: () => void }) {
  return useMemo(() => {
    const actions = [];

    actions.push({
      icon: React.createElement(BVCIcon, {
        src: require('./../../../../assets/Close_48x48.png'),
        size: 'small',
      }),
      onClick: onCancel,
    });

    return actions;
  }, [onCancel]);
}
