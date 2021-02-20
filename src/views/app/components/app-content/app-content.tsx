import React from 'react';
import { Project } from '../../interfaces/project';

export const AppContent = React.memo(function AppContent({ project }: { project?: Project }) {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'flex-start',
				paddingLeft: 24,
				paddingRight: 48,
			}}
		>
			<div
				style={{
					height: 80,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<div style={{}}>{project?.name || 'No project selected'}</div>
			</div>

			<div style={{ flex: 1, marginTop: 24 }}></div>
		</div>
	);
});
