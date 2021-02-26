import { useContext } from 'react';
import { UserContext } from '../context/user-context';

export function useUser() {
	const context = useContext(UserContext);

	return {
		user: context.user,
	};
}
