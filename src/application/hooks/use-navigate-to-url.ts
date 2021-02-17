import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

export function useNavigateToUrl() {
  const history = useHistory();

  return useCallback(url => history.push(url), [history]);
}
