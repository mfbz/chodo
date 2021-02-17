import { useNavigateToUrl } from '../../../hooks/use-navigate-to-url';
import { useCallback } from 'react';

export function useNavigateToAlarms() {
  const navigateToUrl = useNavigateToUrl();

  return useCallback(() => navigateToUrl('/alarm'), []);
}
