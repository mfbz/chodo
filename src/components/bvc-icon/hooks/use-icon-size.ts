import { IconSize } from '../interfaces/icon-size';
import { useMemo } from 'react';

export function useIconSize(size?: IconSize) {
  return useMemo(() => {
    switch (size) {
      case 'normal':
        return 48;
      case 'large':
        return 96;
      case 'small':
        return 28;
      default:
        return 48;
    }
  }, []);
}
