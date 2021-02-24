import React from 'react';
import { render } from 'react-dom';
import { Main } from './main';
import './style.less';
import config from './app.config.json';

render(<Main config={config} />, document.getElementById('root'));
