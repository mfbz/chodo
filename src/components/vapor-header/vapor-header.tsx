import React from 'react';
import { Link } from 'react-router-dom';
import ChodoLogoSVG from '../../assets/logo.svg';

export const VaporHeader = React.memo(function VaporHeader({ extra }: { extra?: React.ReactNode }) {
	return (
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

			<div style={{}}>{extra}</div>
		</div>
	);
});
