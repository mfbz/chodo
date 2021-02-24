import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectionProvider } from './solana/connection';
import { App } from './views/app';
import { Home } from './views/home';

export const Main = React.memo(function Main({
	config,
}: {
	config: {
		programAddress: string;
		network: string;
	};
}) {
	return (
		<BrowserRouter>
			<ConnectionProvider network={config.network}>
				<div style={{ width: '100%', height: '100%', minHeight: '100vh' }}>
					<Switch>
						<Route key={'/'} path={'/'} exact={true}>
							<Home />
						</Route>

						<Route key={'/app'} path={'/app'}>
							<App />
						</Route>
					</Switch>
				</div>
			</ConnectionProvider>
		</BrowserRouter>
	);
});
