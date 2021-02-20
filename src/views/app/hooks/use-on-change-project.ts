import { useCallback } from 'react';
import { Project } from '../interfaces/project';

export function useOnChangeProject() {
	return useCallback((project: Project) => {
		console.log('Selected project changed', project);
	}, []);
}
