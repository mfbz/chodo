import { useMemo } from 'react';

export function useTableScrollY(height?: number) {
  return useMemo(() => {
    if (height) {
      // The height of the scroll is the total height of the table minus header height
      return height - 72;
    }
    return undefined;
  }, [height]);
}
