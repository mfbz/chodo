import React from 'react';
import { Link } from 'react-router-dom';
import ChodoLogoSVG from '../../assets/logo.svg';
import { VaporButton } from '../../components/vapor-button';
import { Typography } from 'antd';

export const App = React.memo(function App() {
	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
			<div
				style={{
					width: '100%',
					height: 80,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingLeft: 48,
					paddingRight: 48,
				}}
			>
				<div style={{}}>
					<Link to="/">
						<img src={ChodoLogoSVG} style={{ width: 120 }} alt="chodo logo" />
					</Link>
				</div>

				<div style={{}}>
					<VaporButton danger={true} size={'large'}>
						App
					</VaporButton>
				</div>
			</div>

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
