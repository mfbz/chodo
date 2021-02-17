import { useCallback } from 'react';
import { useLoginHandler } from '../../../hooks/use-login-handler';

export function useLoadLanguages() {
  const { loadLanguages } = useLoginHandler();

  return useCallback(async () => {
    if (loadLanguages) {
      try {
        return await loadLanguages();
      } catch (e) {
        console.error('An error occurred while loadLanguages in:', e);
        return null;
      }
    }
    return null;
  }, [loadLanguages]);
}
