import React from 'react';
import { Route } from '../../interfaces/route';
import { BVCIcon } from '../../../components/bvc-icon';
import { AccountView } from './account.view';

export const AccountRoute = {
  title: 'Account',
  url: '/account',
  icon: React.createElement(BVCIcon, { src: require('./../../../assets/UserAccount_48x48.png') }),
  component: React.createElement(AccountView),
  level: 'user',
} as Route;
