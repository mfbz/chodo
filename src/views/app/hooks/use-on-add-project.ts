import { useCallback } from 'react';

export function useOnAddProject() {
	return useCallback(() => {
		console.log('Add pressed');
	}, []);
}
