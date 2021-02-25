import { Connection } from '@solana/web3.js';
import React from 'react';
import { DEFAULT_CONNECTION_ENPOINT } from '../constants/connection-constants';
import { ConnectionConfig } from '../interfaces/connection-config';

export const ConnectionContext = React.createContext<ConnectionConfig>({
	endpoint: DEFAULT_CONNECTION_ENPOINT,
	connection: new Connection(DEFAULT_CONNECTION_ENPOINT.url, 'recent'),
	sendConnection: new Connection(DEFAULT_CONNECTION_ENPOINT.url, 'recent'),
});
