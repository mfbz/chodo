import { useRect } from '../../hooks/use-rect';
import useWindowDimensions from '../../hooks/use-window-dimensions';
import { useMemo } from 'react';

export function useDropdownPosition() {
  const { ref, rect } = useRect();
  const { width } = useWindowDimensions();

  return useMemo(() => ({ ref, top: rect.bottom, right: width - rect.right }), [rect, width]);
}
