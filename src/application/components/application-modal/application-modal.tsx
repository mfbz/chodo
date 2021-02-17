import React from 'react';
import { useCurrentModal } from '../../hooks/use-current-modal';

export const ApplicationModal = React.memo(function ApplicationModal() {
  const modal = useCurrentModal();
  return modal;
});
