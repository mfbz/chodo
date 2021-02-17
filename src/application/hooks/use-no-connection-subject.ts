import { useModule } from './use-module';
import { useMemo } from 'react';

export function useNoConnectionSubject() {
  const module = useModule();

  return useMemo(() => module?.noConnectionSubject, [module]);
}
