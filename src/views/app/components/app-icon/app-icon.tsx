import * as React from 'react';

export const AppIcon = React.memo(function AppIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 75 75">
			<path fill="none" d="M0 0h75v75H0z" />
			<path
				d="M23.93 40.334l-.01-.01 21.991-21.991.01.01A10.944 10.944 0 0161.378 33.8l.01.01L39.398 55.8l-.01-.01A10.944 10.944 0 0123.93 40.334z"
				fill="#ff006c"
			/>
			<path
				d="M24.327 55.393L13.33 44.396l.01-.01A10.944 10.944 0 0128.797 28.93l.01-.01 11.408 11.407-.01.01a10.944 10.944 0 01-15.456 15.456l-.01.01z"
				fill="#00ffb9"
			/>
		</svg>
	);
});
