import { useCallback } from 'react';
import { BVCTabLayoutItem } from '../interfaces/bvc-tab-layout-item';

export function useOnDeleteTab(onDeleteTab?: (item: BVCTabLayoutItem) => void) {
  return useCallback(
    item => {
      if (onDeleteTab) {
        onDeleteTab(item);
      }
    },
    [onDeleteTab],
  );
}
