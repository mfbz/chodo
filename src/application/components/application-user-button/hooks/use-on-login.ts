import { useCallback } from 'react';
import { useLoginHandler } from '../../../hooks/use-login-handler';
import { setCurrentUserToken, getCurrentUser } from '../../../store/user';
import { changeLanguage } from '../../../utils/change-language';
import { LoginErrorCode } from '../../../interfaces/handler';

export function useOnLogin({
  onSuccess,
  onFail,
}: {
  onSuccess?: () => void;
  onFail?: (errorCode: LoginErrorCode) => void;
}) {
  const { onLogin } = useLoginHandler();

  return useCallback(
    async values => {
      try {
        // Get login response parsed data
        const data = await onLogin!(values.username, values.password);

        if (data.success) {
          // SUCCESS
          // Set current user from the token string returned from the login
          setCurrentUserToken(data.token!);

          // Change ui language if user has different language
          const currentUser = getCurrentUser();
          if (currentUser?.language) {
            await changeLanguage(currentUser.language);
          }

          // Call final success method
          if (onSuccess) {
            onSuccess();
          }

          return { success: true };
        } else {
          // FAIL
          if (onFail) {
            onFail(data.errorCode!);
          }

          return { success: false, errorCode: data.errorCode! };
        }
      } catch (e) {
        console.error('An error occurred while logging in:', e);
        return { success: false, errorCode: LoginErrorCode.GenericError };
      }
    },
    [onLogin, onSuccess, onFail],
  );
}
