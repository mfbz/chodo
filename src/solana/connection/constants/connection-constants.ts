import { clusterApiUrl } from '@solana/web3.js';
import { ConnectionEndpoint } from '../interfaces/connection-endpoint';

export const CONNECTION_ENDPOINTS = [
	{ name: 'localnet', url: 'http://127.0.0.1:8899' },
	{ name: 'devnet', url: clusterApiUrl('devnet') },
	{ name: 'testnet', url: clusterApiUrl('testnet') },
	{ name: 'mainnet-beta', url: clusterApiUrl('mainnet-beta') },
] as ConnectionEndpoint[];

export const DEFAULT_CONNECTION_ENPOINT = CONNECTION_ENDPOINTS[0];
