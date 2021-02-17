import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRoutesMap } from './use-routes-map';
import { Route } from '../interfaces/route';
import { useMultiRoutesMap } from './use-multi-routes-map';

export function useCurrentRoute() {
  const [currentRoute, setCurrentRoute] = useState<Route>();

  const routesMap = useRoutesMap();
  const multiRoutesMap = useMultiRoutesMap();

  const location = useLocation();

  useEffect(() => {
    // Get the params that composes the string
    const params = location.pathname.split('/');
    // Create real route url from params, the current route url is always last one
    const routeUrl = `/${params.length ? params[params.length - 1] : params[0]}`;

    // Get current route by searching inside route map
    const _currentRoute = routesMap?.get(routeUrl);

    if (_currentRoute) {
      // If already found just set it
      setCurrentRoute(_currentRoute);
    } else {
      // Otherwise search if we are in its multiroute
      const _currentMultiRoute = multiRoutesMap?.get(routeUrl);

      // if in multiroute set as current route its first one
      if (_currentMultiRoute && _currentMultiRoute.routes.length) {
        setCurrentRoute(_currentMultiRoute.routes[0]);
      }
    }
  }, [routesMap, multiRoutesMap, location]);

  return currentRoute;
}
