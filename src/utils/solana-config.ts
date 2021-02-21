import { Cluster } from '@solana/web3.js';
import config from './../solana.config.json';

export interface WalletProvider {
	name: string;
	url: string;
}

export interface SolanaConfig {
	programAddress: string;
	network: Cluster;
	walletProviders: WalletProvider[];
}

export function solanaConfig() {
	return config as SolanaConfig;
}
