import { useCallback } from 'react';
import { BVCTabLayoutItem } from '../interfaces/bvc-tab-layout-item';

export function useOnEditTab(onEditTab?: (item: BVCTabLayoutItem) => void) {
  return useCallback(
    item => {
      if (onEditTab) {
        onEditTab(item);
      }
    },
    [onEditTab],
  );
}
