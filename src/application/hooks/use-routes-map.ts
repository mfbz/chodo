import { useState, useEffect } from 'react';
import { getRoutesMap } from '../store/router';
import { Route } from '../interfaces/route';

export function useRoutesMap() {
  const [routesMap, setRoutesMap] = useState<Map<string, Route>>(new Map<string, Route>());

  useEffect(() => {
    const _routesMap = getRoutesMap();

    setRoutesMap(_routesMap);
  }, []);

  return routesMap;
}
