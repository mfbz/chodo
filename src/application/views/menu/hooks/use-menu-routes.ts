import { useMemo } from 'react';
import { useRoutesToMultiRoutesMap } from '../../../hooks/use-routes-to-multi-routes-map';
import { Route } from '../../../interfaces/route';
import { useCurrentUser } from '../../../hooks/use-current-user';
import { disabledByUser } from '../../../hooks/use-disabled-by-user';

export function useMenuRoutes() {
  // Current user to show or hide some menu routes depending on their level
  const { user } = useCurrentUser();
  // Routes to multi routes map
  const routesToMultiRoutesMap = useRoutesToMultiRoutesMap();

  return useMemo(() => {
    const menuRoutes: Route[] = [];

    routesToMultiRoutesMap.forEach((multiRoute, route) => {
      let _route: Route | null = null;

      if (multiRoute && multiRoute.routes.length) {
        // Add only if not disabled by user level and if not already added
        if (
          (!multiRoute.level || !disabledByUser(user, multiRoute.level)) &&
          !menuRoutes.find(_menuRoute => _menuRoute.url === multiRoute.url)
        ) {
          // Get first one that can be displayed due to level restrictions
          for (const subRoute of multiRoute.routes) {
            if (!subRoute.level || !disabledByUser(user, subRoute.level)) {
              // Update subroute url for correct navigation to multiroute
              _route = { ...subRoute, title: multiRoute.title, url: multiRoute.url };
              break;
            }
          }
        }
      } else {
        // Add to menu routes only if not menu route and enough level
        if (route.url !== '/menu' && (!route.level || !disabledByUser(user, route.level))) {
          _route = { ...route };
        }
      }

      if (_route !== null) {
        // If home put it in front!
        if (_route.url === '/home') {
          menuRoutes.unshift(_route);
        } else {
          menuRoutes.push(_route);
        }
      }
    });

    return menuRoutes;
  }, [user, routesToMultiRoutesMap]);
}
