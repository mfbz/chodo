import { Route } from '../interfaces/route';

const routes: Route[] = [];
const routesMap = new Map<string, Route>();

export function defineRoute(route: Route) {
  routes.push(route);
  routesMap.set(route.url, route);
}

export function getRoutes() {
  return routes;
}

export function getRoutesMap() {
  return routesMap;
}