import { Connection } from '@solana/web3.js';

export const getErrorForTransaction = async (connection: Connection, txid: string) => {
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
};
