import { useMemo } from 'react';

// TODO
export function useUser(wallet: any) {
	// TODO SUBSCRIPTION TO PROJECTS TO RECEIVE UPDATE WHEN ADDED ONE
	// OR RECALL GET METHOD WHEN SUCCESFULLY ADDED A PROJECT
	return useMemo(() => {
		return { id: '1', name: 'mfbz' };
	}, []);
}
