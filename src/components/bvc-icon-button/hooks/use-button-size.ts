import { useMemo } from 'react';
import { IconSize } from '../../bvc-icon/interfaces/icon-size';

export function useButtonSize(size?: IconSize) {
  return useMemo(() => {
    switch (size) {
      case 'normal':
        return { width: 76, height: 60, padding: '4px 10px 5px 10px' };
      case 'large':
        return { width: 122, height: 110, padding: '4px 10px 5px 10px' };
      case 'small':
        return { width: 58, height: 44, padding: '0px 0px 6px 0px' };
      default:
        return { width: 76, height: 60, padding: '4px 10px 5px 10px' };
    }
  }, []);
}
