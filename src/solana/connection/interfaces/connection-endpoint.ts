export type ConnectionNetwork = 'mainnet-beta' | 'testnet' | 'devnet' | 'localnet';

export interface ConnectionEndpoint {
	name: ConnectionNetwork;
	url: string;
}
