import React, { useMemo } from 'react';
import { BVCLabel } from '../../../../components/bvc-label';
import { LoginErrorCode } from '../../../interfaces/handler';

export const ApplicationLoginError = React.memo(function ApplicationLoginError({
  errorCode,
}: {
  errorCode: LoginErrorCode;
}) {
  const message = useMemo(() => {
    switch (errorCode) {
      case LoginErrorCode.InvalidUsernameOrPassword:
        return 'Invalid username or password';
      case LoginErrorCode.RemoteIPNotAllowed:
        return 'Remote connection not allowed';
      case LoginErrorCode.UserDurationExpired:
        return 'User duration expired';
      default:
        return 'An error occurred';
    }
  }, [errorCode]);

  return (
    <div style={{ background: '#ff4d4f', padding: 16, borderRadius: 4 }}>
      <BVCLabel text={message} />
    </div>
  );
});
