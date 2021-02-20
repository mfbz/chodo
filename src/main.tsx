import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from './views/app';
import { Home } from './views/home';

export const Main = React.memo(function Main() {
	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
});
