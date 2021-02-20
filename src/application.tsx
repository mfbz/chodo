import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Hero } from './views/hero';

export const Application = React.memo(function Application() {
	return (
		<BrowserRouter>
			<div style={{ width: '100%', height: '100%', minHeight: '100vh' }}>
				<Switch>
					<Route key={'/'} path={'/'} exact={true}>
						<Hero />
					</Route>

					<Route key={'/test'} path={'/test'}>
						test
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
});
