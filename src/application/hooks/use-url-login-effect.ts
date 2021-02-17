import { useLocation } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { useOnLogin } from '../components/application-user-button/hooks/use-on-login';
import { useCurrentUser } from './use-current-user';
import { useNavigateToUrl } from './use-navigate-to-url';

export function useUrlLoginEffect() {
  // Extract login values from location
  const location = useLocation();
  const values = useMemo(() => {
    const params = new URLSearchParams(location.search);

    // Extract username and password from query params
    return { username: params.get('username'), password: params.get('password') };
  }, [location]);

  // Get login callback from the one already used in login button
  // Redirect to home page when logged in to clear also query params
  const navigateToUrl = useNavigateToUrl();
  const onLogin = useOnLogin({ onSuccess: () => navigateToUrl('/home') });

  // Get current logged in user if present
  const { user } = useCurrentUser();

  // When some queryParams are received and the user isn't already logged in, do a login request
  useEffect(() => {
    if (!user && values.username && values.password) {
      onLogin({ username: values.username, password: values.password });
    }
  }, [user, values, onLogin]);
}
