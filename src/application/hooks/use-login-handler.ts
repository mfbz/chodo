import { useModule } from './use-module';
import { useMemo } from 'react';

export function useLoginHandler() {
  const module = useModule();

  return useMemo(
    () => ({
      onLogin: module?.loginHandler?.onLogin,
      onLogout: module?.loginHandler?.onLogout,
      onUpdateUser: module?.loginHandler?.onUpdateUser,
      loadLanguages: module?.loginHandler?.loadLanguages,
    }),
    [module],
  );
}
