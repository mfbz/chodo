import React from 'react';
import { VaporHeader } from '../../components/vapor-header';

export const App = React.memo(function App() {
	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
			<VaporHeader />

			<div
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					paddingLeft: 48,
					paddingRight: 48,
				}}
			>
				asd
			</div>
		</div>
	);
});
