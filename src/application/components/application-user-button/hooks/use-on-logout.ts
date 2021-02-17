import { useCallback } from 'react';
import { useLoginHandler } from '../../../hooks/use-login-handler';
import { setCurrentUserToken } from '../../../store/user';
import { changeLanguage } from '../../../utils/change-language';
import { useNavigateToUrl } from '../../../hooks/use-navigate-to-url';

export function useOnLogout() {
  const navigateToUrl = useNavigateToUrl();
  const { onLogout } = useLoginHandler();

  return useCallback(async () => {
    if (onLogout) {
      try {
        await onLogout();
        setCurrentUserToken(null);

        // Change back the language to default one
        await changeLanguage('en');
        // Navigate back to home
        navigateToUrl('/');
      } catch (e) {
        console.error('An error occurred while logging out:', e);
      }
    }
  }, [onLogout, navigateToUrl]);
}
