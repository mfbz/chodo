import React from 'react';
import { useProjects } from './hooks/use-projects';
import { AppMenu } from './components/app-menu';
import { useOnAddProject } from './hooks/use-on-add-project';
import { useOnChangeProject } from './hooks/use-on-change-project';

export const App = React.memo(function App() {
	const projects = useProjects();
	const onAddProject = useOnAddProject();
	const onChangeProject = useOnChangeProject();

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
			<AppMenu projects={projects} onAdd={onAddProject} onChange={onChangeProject} />

			<div
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					paddingLeft: 24,
					paddingRight: 48,
				}}
			>
				asd
			</div>
		</div>
	);
});
