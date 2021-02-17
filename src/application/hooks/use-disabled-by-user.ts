import { useCurrentUser } from './use-current-user';
import { useMemo } from 'react';
import { User } from '../interfaces/user';

export const UserRoleLevelMap = {
  user: 0,
  operator: 1,
  service: 2,
};

export function disabledByUser(user?: User | null, minRole?: 'user' | 'operator' | 'service') {
  if (user !== undefined && user !== null) {
    if (minRole) {
      return UserRoleLevelMap[user.role] < UserRoleLevelMap[minRole];
    }

    return false;
  }

  return true;
}

export function useDisabledByUser(minRole?: 'user' | 'operator' | 'service') {
  const { user } = useCurrentUser();

  return useMemo(() => disabledByUser(user, minRole), [user, minRole]);
}
