import { useMemo } from 'react';
import useWindowDimensions from '../../../../components/hooks/use-window-dimensions';
import useDimensions from 'react-cool-dimensions';

export function useModalPosition() {
  const { ref, width, height } = useDimensions();

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  return useMemo(() => ({ ref, top: (windowHeight - height) / 2, left: (windowWidth - width) / 2 }), [
    ref,
    width,
    height,
    windowWidth,
    windowHeight,
  ]);
}
