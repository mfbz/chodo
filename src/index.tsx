import React from 'react';
import { render } from 'react-dom';
import { Main } from './main';
import './style.less';

render(
  <Main
    solanaConfig={{
      programAddress: '13hfskdf2834kb56sdjf2834kbsdfjks824_TODO',
      network: 'devnet',
    }}
  />,
  document.getElementById('root'),
);
