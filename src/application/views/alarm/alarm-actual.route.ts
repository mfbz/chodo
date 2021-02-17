import React from 'react';
import { AlarmActualView } from './alarm-actual.view';
import { Route } from '../../interfaces/route';
import { BVCIcon } from '../../../components/bvc-icon';

export const AlarmActualRoute = {
  title: 'Actual',
  url: '/alarm-actual',
  icon: React.createElement(BVCIcon, { src: require('./../../../assets/SystemIconError_48x48.png') }),
  component: React.createElement(AlarmActualView),
} as Route;
