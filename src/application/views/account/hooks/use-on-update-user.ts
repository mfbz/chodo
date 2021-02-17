import { useLoginHandler } from '../../../hooks/use-login-handler';
import { useCallback } from 'react';
import { setCurrentUserToken, getCurrentUser } from '../../../store/user';
import { changeLanguage } from '../../../utils/change-language';
import { User } from '../../../interfaces/user';
import { LoginErrorCode } from '../../../interfaces/handler';

export function useOnUpdatedUser({
  onSuccess,
  onFail,
}: {
  onSuccess?: () => void;
  onFail?: (errorCode: LoginErrorCode) => void;
}) {
  const { onUpdateUser } = useLoginHandler();

  return useCallback(
    async (user: User, password: string) => {
      try {
        // Get update response parsed data
        const data = await onUpdateUser!(user, password);

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
        console.error('An error occurred while updating the user:', e);
        return { success: false, errorCode: LoginErrorCode.GenericError };
      }
    },
    [onUpdateUser, onSuccess, onFail],
  );
}
