import { useNavigateToUrl } from '../../../hooks/use-navigate-to-url';
import { useCallback, useMemo } from 'react';

export function useNavigation() {
  const navigateToUrl = useNavigateToUrl();

  const navigateToHome = useCallback(() => navigateToUrl('/home'), [navigateToUrl]);
  const navigateToMenu = useCallback(() => navigateToUrl('/menu'), [navigateToUrl]);
  const navigateToManual = useCallback(() => navigateToUrl('/manual'), [navigateToUrl]);

  return useMemo(() => ({ navigateToHome, navigateToMenu, navigateToManual, navigateToUrl }), [
    navigateToHome,
    navigateToMenu,
    navigateToManual,
    navigateToUrl,
  ]);
}
