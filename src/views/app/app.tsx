import React, { useCallback, useState } from 'react';
import { useProjects } from './hooks/use-projects';
import { AppMenu } from './components/app-menu';
import { useOnAddProject } from './hooks/use-on-add-project';
import { AppContent } from './components/app-content';
import { Project } from './interfaces/project';

export const App = React.memo(function App() {
	const projects = useProjects();
	const onAddProject = useOnAddProject();

	const [selectedProject, setSelectedProject] = useState<Project>(projects?.[0]);
	const onSelectProject = useCallback((project: Project) => {
		setSelectedProject(project);
	}, []);

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
			<AppMenu selectedProject={selectedProject} projects={projects} onAdd={onAddProject} onSelect={onSelectProject} />

			<div style={{ flex: 1 }}>
				<AppContent project={selectedProject} />
			</div>
		</div>
	);
});
