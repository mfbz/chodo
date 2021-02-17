import React from 'react';
import { AlarmHistoricalView } from './alarm-historical.view';
import { Route } from '../../interfaces/route';
import { BVCIcon } from '../../../components/bvc-icon';

export const AlarmHistoricalRoute = {
  title: 'Historical',
  url: '/alarm-historical',
  icon: React.createElement(BVCIcon, { src: require('./../../../assets/SystemIconError_48x48.png') }),
  component: React.createElement(AlarmHistoricalView),
} as Route;
