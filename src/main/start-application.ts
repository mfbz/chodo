import { forkJoin } from 'rxjs';
import { delay, retryWhen, take, tap } from 'rxjs/operators';
import { defineLanguage } from '../application/utils/define-language';
import { connectToWampRouter } from '../wamphooks/connect-to-wamp-router';
import { callProcedureHmimanagerGetMachineConfig } from '../wamphooks/procedures/use-procedure-hmimanager-getmachineconfig';
import { ConfigHelper } from './helpers/config-helper';
import { loadAlarmService } from './utils/load-alarm-service-url';
import { loadModule } from './load-module';
import { loadRoutes } from './load-routes';

export async function startApplication(wampUrl: string, apiUrl: string, ownUrl: string) {
  await defineLanguage('DLU', ownUrl + '/locales/{{lng}}/DLU.json');

  await new Promise(resolve => {
    connectToWampRouter(wampUrl, 'DC.LoadUnload');

    forkJoin([
      callProcedureHmimanagerGetMachineConfig().pipe(
        tap(machineConfig => {
          if (!ConfigHelper.validateMachineConfig(machineConfig)) {
            throw 'Invalid machine config';
          }
        }),
        retryWhen(errors$ => errors$.pipe(delay(1000))),
      ),
    ])
      .pipe(take(1))
      .subscribe(([machineConfig]: [any]) => {
        loadModule(machineConfig.info.name, apiUrl);
        loadRoutes(machineConfig.lasers, {
          workMode: machineConfig.config.workMode,
          sortEnabled: machineConfig.machineTasks.sort.enabled,
          bigPartRemovalEnabled: machineConfig.machineTasks.bigPartRemoval.enabled,
        });

        loadAlarmService(apiUrl);

        resolve();
      });
  });
}
