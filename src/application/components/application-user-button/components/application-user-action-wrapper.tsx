import React from 'react';
import { User } from '../../../interfaces/user';
import { ApplicationLogoutButton } from './application-logout-button';
import { ApplicationLoginButton } from './application-login-button';

export const ApplicationUserActionWrapper = React.memo(function ApplicationUserActionWrapper({
  user,
}: {
  user: User | null;
}) {
  if (user) {
    return <ApplicationLogoutButton />;
  } else {
    return <ApplicationLoginButton />;
  }
});
