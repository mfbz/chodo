import useWindowDimensions from '../../../../components/hooks/use-window-dimensions';
import { useMemo } from 'react';

export function useModalDimensions(size: 'normal' | 'large') {
  const { height: windowHeight } = useWindowDimensions();

  return useMemo(
    () => ({
      width: size === 'normal' ? 600 : 800,
      minHeight: 400,
      maxHeight: windowHeight * 0.8,
    }),
    [size, windowHeight],
  );
}
