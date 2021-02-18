import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChodoLogo from './assets/logo.svg';

export const Application = React.memo(function Application() {
	// TODO USE IMG TO REPRESENT SVG go on from this
	return (
		<BrowserRouter>
			<div style={{ width: '100%', height: '100%', minHeight: '100vh' }}>
				<Switch>
					<Route key={'/'} path={'/'} exact={true}>
						<img src={ChodoLogo} style={{ width: 400 }} alt="logo" />
					</Route>

					<Route key={'/test'} path={'/test'}>
						test
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
});
