import { Connection, Transaction, TransactionInstruction, Account } from '@solana/web3.js';
import { WalletAdapter } from '../../../wallet';

// From https://github.com/solana-labs/dapp-scaffold/blob/96c3160080e41deb752719cca6df88a85a0b3195/src/contexts/connection.tsx
export async function sendSignedTransaction(
	connection: Connection,
	wallet: WalletAdapter,
	instructions: TransactionInstruction[],
	signers: Account[],
	awaitConfirmation = true,
) {
	if (!wallet?.publicKey) {
		throw new Error('Wallet is not connected');
	}

	let transaction = new Transaction();
	instructions.forEach((instruction) => transaction.add(instruction));
	transaction.recentBlockhash = (await connection.getRecentBlockhash('max')).blockhash;
	transaction.setSigners(
		// Fee payied by the wallet owner
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

			console.error('Error executing transaction', errors);
			throw new Error(`Raw transaction ${txid} failed (${JSON.stringify(status)})`);
		}
	}

	return txid;
}

async function getErrorForTransaction(connection: Connection, txid: string) {
	// wait for all confirmation before geting transaction
	await connection.confirmTransaction(txid, 'max');

	const tx = await connection.getParsedConfirmedTransaction(txid);

	const errors: string[] = [];
	if (tx?.meta && tx.meta.logMessages) {
		tx.meta.logMessages.forEach((log) => {
			const regex = /Error: (.*)/gm;
			let m;
			while ((m = regex.exec(log)) !== null) {
				// This is necessary to avoid infinite loops with zero-width matches
				if (m.index === regex.lastIndex) {
					regex.lastIndex++;
				}

				if (m.length > 1) {
					errors.push(m[1]);
				}
			}
		});
	}

	return errors;
}
