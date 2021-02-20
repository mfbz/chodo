import { useCallback } from 'react';

// TODO ADD REAL METHOD
export function useOnAddProject() {
	return useCallback(() => {
		console.log('Add pressed');
	}, []);
}
