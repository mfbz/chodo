import { useMemo } from 'react';
import { useRoutesToMultiRoutesMap } from '../../../hooks/use-routes-to-multi-routes-map';
import { Route } from '../../../interfaces/route';

// NB: Similar to useMenuRoutes in menu view

export function useFavoriteRoutes(limit: number = 3) {
  // Routes to multi routes map
  const routesToMultiRoutesMap = useRoutesToMultiRoutesMap();

  return useMemo(() => {
    const favoriteRoutes: Route[] = [];

    routesToMultiRoutesMap.forEach((multiRoute, route) => {
      let _route: Route | null = null;

      if (multiRoute && multiRoute.routes.length) {
        if (!favoriteRoutes.find(_menuRoute => _menuRoute.url === multiRoute.url)) {
          // Get first one of that multi route that can be used
          for (const subRoute of multiRoute.routes) {
            if (subRoute.favorite) {
              // Update subroute url for correct navigation to multiroute
              _route = { ...subRoute, title: multiRoute.title, url: multiRoute.url };
              break;
            }
          }
        }
      } else {
        if (route.favorite) {
          _route = { ...route };
        }
      }

      if (_route !== null) {
        favoriteRoutes.push(_route);
      }
    });

    return favoriteRoutes.length > limit ? favoriteRoutes.slice(0, limit) : favoriteRoutes;
  }, [limit, routesToMultiRoutesMap]);
}
