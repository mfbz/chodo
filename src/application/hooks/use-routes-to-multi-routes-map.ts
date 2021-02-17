import { useState, useEffect } from 'react';
import { getRoutesToMultiRoutesMap } from '../store/router';
import { MultiRoute, Route } from '../interfaces/route';

export function useRoutesToMultiRoutesMap() {
  const [routesToMultiRoutesMap, setRoutesToMultiRoutesMap] = useState<Map<Route, MultiRoute | undefined>>(
    new Map<Route, MultiRoute | undefined>(),
  );

  useEffect(() => {
    const _routesToMultiRoutesMap = getRoutesToMultiRoutesMap();

    setRoutesToMultiRoutesMap(_routesToMultiRoutesMap);
  }, []);

  return routesToMultiRoutesMap;
}
