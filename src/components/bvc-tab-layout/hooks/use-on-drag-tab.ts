import { DropResult } from 'react-beautiful-dnd';
import { useCallback } from 'react';

export function useOnDragTab(onDragTab?: (result: DropResult) => void) {
  return useCallback(
    result => {
      if (onDragTab) {
        onDragTab(result);
      }
    },
    [onDragTab],
  );
}
