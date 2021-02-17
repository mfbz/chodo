import React from 'react';
import { Route } from '../../application/interfaces/route';
import { RunlistView } from './runlist.view';
import { BVCIcon } from '../../components/bvc-icon';

export const RunlistRoute = {
  title: 'Runlist',
  url: '/runlist',
  icon: React.createElement(BVCIcon, { src: require('./../../assets/EntireHelp_48x48.png') }),
  component: React.createElement(RunlistView),
  favorite: true,
} as Route;
