declare module '@project-serum/sol-wallet-adapter' {
	import { PublicKey, Transaction } from '@solana/web3.js';

	// Class extracted from https://github.com/project-serum/sol-wallet-adapter/blob/master/src/index.js
	export default class WalletAdapter {
		constructor(providerUrl: string, network: string);

		publicKey: PublicKey;
		connected: boolean;
		autoApprove: boolean;

		connect: () => Promise<void>;
		disconnect: () => Promise<void>;

		signTransaction: (transaction: Transaction) => Promise<Transaction>;
		signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
	}
}
