import { Module } from '../interfaces/module';
import { setDeviceRunning } from './device';
import { setAlarms, clearAlarms } from './alarm';
import { defineRoute, defineMultiRoute } from './router';
import { AlarmMultiRoute } from '../views/alarm';
import { MenuRoute } from '../views/menu';
import { AccountRoute } from '../views/account';

let _module: Module | null = null;

export function defineModule(module: Module) {
  _module = module;

  // Define application based routes that are always present
  defineRoute(MenuRoute);
  defineRoute(AccountRoute);
  defineMultiRoute(AlarmMultiRoute);

  // Register handlers connecting the methods passed to them with application level methods
  _module.deviceHandler.register({ setDeviceRunning });
  _module.alarmHandler.register({ setAlarms, clearAlarms });
}

export function getModule() {
  return _module;
}
