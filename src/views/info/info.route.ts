import React from 'react';
import { Route } from '../../application/interfaces/route';
import { BVCIcon } from '../../components/bvc-icon';
import { InfoView } from './info.view';

export const InfoRoute = {
  title: 'Info',
  url: '/info',
  icon: React.createElement(BVCIcon, { src: require('./../../assets/Information_48x48.png') }),
  component: React.createElement(InfoView),
} as Route;
