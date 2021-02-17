import useWindowDimensions from '../../../../components/hooks/use-window-dimensions';
import { useMemo } from 'react';

export function useAlarmButtonDimensions() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  return useMemo(() => ({ width: windowWidth * 0.5, height: windowHeight * 0.6 }), [windowWidth, windowHeight]);
}
