import { useMemo } from 'react';

// TODO
export function useProjects() {
	// TODO SUBSCRIPTION TO PROJECTS TO RECEIVE UPDATE WHEN ADDED ONE
	// OR RECALL GET METHOD WHEN SUCCESFULLY ADDED A PROJECT
	return useMemo(() => {
		return [
			{ id: '1', name: 'Project 1' },
			{ id: '2', name: 'Project 2' },
		];
	}, []);
}
