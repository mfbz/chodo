import { useState, useEffect } from 'react';
import { getRoutes } from '../store/router';
import { Route } from '../interfaces/route';

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const _routes = getRoutes();

    setRoutes(_routes);
  }, []);

  return routes;
}
