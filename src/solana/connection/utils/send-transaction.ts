import { Connection, TransactionInstruction, Transaction, Account } from '@solana/web3.js';
import { WalletAdapter } from '../../wallet';
import { getErrorForTransaction } from './get-error-for-transaction';

export const sendTransaction = async (
	connection: Connection,
	wallet: WalletAdapter,
	instructions: TransactionInstruction[],
	signers: Account[],
	awaitConfirmation = true,
) => {
	if (!wallet?.publicKey) {
		throw new Error('Wallet is not connected');
	}

	let transaction = new Transaction();
	instructions.forEach((instruction) => transaction.add(instruction));
	transaction.recentBlockhash = (await connection.getRecentBlockhash('max')).blockhash;
	transaction.setSigners(
		// fee payied by the wallet owner
		wallet.publicKey,
		...signers.map((s) => s.publicKey),
	);
	if (signers.length > 0) {
		transaction.partialSign(...signers);
	}
	transaction = await wallet.signTransaction(transaction);
	const rawTransaction = transaction.serialize();
	let options = {
		skipPreflight: true,
		commitment: 'singleGossip',
	};

	const txid = await connection.sendRawTransaction(rawTransaction, options);

	if (awaitConfirmation) {
		const status = (await connection.confirmTransaction(txid, options && (options.commitment as any))).value;

		if (status?.err) {
			const errors = await getErrorForTransaction(connection, txid);

			console.error('Transaction failed...', errors);
			throw new Error(`Raw transaction ${txid} failed (${JSON.stringify(status)})`);
		}
	}

	return txid;
};
