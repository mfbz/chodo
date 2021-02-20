import { useMemo } from 'react';

// TODO
export function useProjects() {
	return useMemo(() => {
		return [
			{ id: '1', name: 'Project 1' },
			{ id: '2', name: 'Project 2' },
		];
	}, []);
}
