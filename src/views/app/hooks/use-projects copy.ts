import { useMemo } from 'react';

// TODO
export function useTasks(projectId?: string) {
	// TODO SUBSCRIPTION TO PROJECTS TO RECEIVE UPDATE WHEN ADDED ONE
	// OR RECALL GET METHOD WHEN SUCCESFULLY ADDED A PROJECT
	return useMemo(() => {
		return [
			{
				id: '1',
				projectId: '1',
				message: 'This is the first task',
				completed: false,
			},
			{
				id: '2',
				projectId: '2',
				message: 'This is the second task',
				completed: false,
			},
			{
				id: '3',
				projectId: '3',
				message: 'This is the third completed task',
				completed: true,
			},
		].filter((task) => task.projectId === projectId);
	}, [projectId]);
}
