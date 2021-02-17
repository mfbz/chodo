import { Laser } from '../interfaces/laser';
import { DeviceOptions } from '../interfaces/device-options';
import { defineRoute, defineMultiRoute } from '../application';
import { Route, MultiRoute } from '../application/interfaces/route';
import { RouteHelper } from '../helpers/route-helper';
import { CockpitRoute } from '../views/cockpit';
import { ManualRoute } from '../views/manual';
import { AreaRoute } from '../views/area';
import { CustomRoute } from '../views/custom';
import { RunlistRoute } from '../views/runlist';
import { SortingMultiRoute } from '../views/sorting';
import { SetupMultiRoute } from '../views/setup';
import { CustomManagerRoute } from '../views/custom-manager';
import { InfoRoute } from '../views/info';

export function loadRoutes(lasers: Laser[], options: DeviceOptions) {
  const routes: Route[] = [
    RouteHelper.getMachineRoute(ManualRoute, options),
    RouteHelper.getMachineRoute(CustomRoute, options),
    RouteHelper.getMachineRoute(CustomManagerRoute, options),
    RouteHelper.getMachineRoute(InfoRoute, options),
  ];
  for (const route of routes) {
    defineRoute(route);
  }

  const multiRoutes: MultiRoute[] = [
    RouteHelper.getLaserMultiRoute(CockpitRoute, lasers, options),
    RouteHelper.getLaserMultiRoute(AreaRoute, lasers, options),
    RouteHelper.getLaserMultiRoute(RunlistRoute, lasers, options),
    RouteHelper.getMachineMultiRoute(SetupMultiRoute, options),
  ];

  // Add optional ones if needed
  if (options.sortEnabled) {
    multiRoutes.push(RouteHelper.getMachineMultiRoute(SortingMultiRoute, options));
  }

  for (const multiRoute of multiRoutes) {
    defineMultiRoute(multiRoute);
  }
}
