import { useCurrentRoute } from '../../../hooks/use-current-route';
import { useMemo } from 'react';
import { useRoutesToMultiRoutesMap } from '../../../hooks/use-routes-to-multi-routes-map';

export function useCurrentTitle() {
  const routesToMultiRoutesMap = useRoutesToMultiRoutesMap();
  const currentRoute = useCurrentRoute();

  return useMemo(() => {
    if (currentRoute) {
      const multiRoute = routesToMultiRoutesMap?.get(currentRoute);
      return multiRoute?.title || currentRoute.title;
    }
    return 'Not found';
  }, [routesToMultiRoutesMap, currentRoute]);
}
