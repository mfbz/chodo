import { useEffect, useState, useMemo } from 'react';
import { User } from '../interfaces/user';
import { getCurrentUser$ } from '../store/user';

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscription = getCurrentUser$().subscribe(_user => {
      setUser(_user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isUser = useMemo(() => user !== null && user.role === 'user', [user]);
  const isOperator = useMemo(() => user !== null && user.role === 'operator', [user]);
  const isService = useMemo(() => user !== null && user.role === 'service', [user]);

  const measurementSystem = useMemo(() => {
    if (user) {
      return user.measurementSystem;
    }
    return undefined;
  }, [user]);

  const language = useMemo(() => {
    if (user) {
      return user.language;
    }
    return undefined;
  }, [user]);

  return { user, isUser, isOperator, isService, language, measurementSystem };
}
