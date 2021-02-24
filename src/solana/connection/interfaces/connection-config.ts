import { Connection } from '@solana/web3.js';
import { ConnectionEndpoint } from './connection-endpoint';

export interface ConnectionConfig {
	endpoint: ConnectionEndpoint;
	connection: Connection;
	sendConnection: Connection;
}
