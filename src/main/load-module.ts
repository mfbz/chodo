import { defineModule, SolanaConfig } from '../application';

export function loadModule(name: string, solanaConfig: SolanaConfig) {
  defineModule({
    name: name,
    noConnectionSubject: getWampNotConnectedSubject$(),
  });
}
