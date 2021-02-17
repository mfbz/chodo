import React, { useMemo } from 'react';
import { useRoutesToMultiRoutesMap } from '../../../hooks/use-routes-to-multi-routes-map';
import { Route as SwitchRoute, Redirect } from 'react-router-dom';
import { ApplicationMultiRouteWrapper } from '../../application-multi-route-wrapper';
import { ApplicationRouteWrapper } from '../../application-route-wrapper';

export function useSwitchRoutes() {
  const routesToMultiRoutesMap = useRoutesToMultiRoutesMap();

  return useMemo(() => {
    const switchRoutes: any[] = [];

    routesToMultiRoutesMap.forEach((multiRoute, route) =>
      // For each route add its switchroute
      // No problem if multiroute added multiple time because react router switch always render one for same path
      switchRoutes.push(
        multiRoute
          ? React.createElement(SwitchRoute, {
              key: multiRoute.url,
              path: multiRoute.url,
              exact: multiRoute.url === '/',
              component: () => React.createElement(ApplicationMultiRouteWrapper, { multiRoute: multiRoute }),
            })
          : React.createElement(SwitchRoute, {
              key: route.url,
              path: route.url,
              exact: route.url === '/',
              component: () => React.createElement(ApplicationRouteWrapper, { route: route }),
            }),
      ),
    );

    // Add a basic route that redirects on home if normal path is passed
    switchRoutes.push(
      React.createElement(SwitchRoute, {
        key: '/',
        path: '/',
        exact: true,
        component: () => React.createElement(Redirect, { to: '/home' }),
      }),
    );

    return switchRoutes;
  }, [routesToMultiRoutesMap]);
}
