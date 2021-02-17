import React from 'react';
import { Route } from '../../../application/interfaces/route';
import { BVCIcon } from '../../../components/bvc-icon';
import { MenuView } from './menu.view';

export const MenuRoute = {
  title: 'Menu',
  url: '/menu',
  icon: React.createElement(BVCIcon, { src: require('./../../../assets/Module_48x48.png') }),
  component: React.createElement(MenuView),
} as Route;
