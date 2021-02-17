import { MultiRoute } from '../../interfaces/route';
import { AlarmActualRoute } from './alarm-actual.route';
//import { AlarmHistoricalRoute } from './alarm-historical.route';

// TODO: For the moment avoid loading history alarms
// AlarmHistoricalRoute
export const AlarmMultiRoute = {
  title: 'Alarms',
  url: '/alarm',
  routes: [AlarmActualRoute],
} as MultiRoute;
