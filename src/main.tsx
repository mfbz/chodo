import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { VaporLayout } from './components/vapor-layout';
import { ConnectionProvider } from './solana/connection';
import { WalletProvider } from './solana/wallet';
import { App } from './views/app';
import { Home } from './views/home';

export const Main = React.memo(function Main({
	config,
}: {
	config: {
		programAddress: string;
		network: string;
		walletProviderUrl: string;
	};
}) {
	return (
		<BrowserRouter>
			<ConnectionProvider network={config.network}>
				<WalletProvider walletProviderUrl={config.walletProviderUrl}>
					<VaporLayout>
						<Switch>
							<Route key={'/'} path={'/'} exact={true}>
								<Home />
							</Route>

							<Route key={'/app'} path={'/app'} exact={true}>
								<App />
							</Route>
						</Switch>
					</VaporLayout>
				</WalletProvider>
			</ConnectionProvider>
		</BrowserRouter>
	);
});
