const { LAMPORTS_PER_SOL } = require('@solana/web3.js');
const { establishConnection, loadPayer } = require('../../lib/network');

/*
 * Log the balance of the payer account
 */

try {
	(async () => {
		const connection = await establishConnection();
		const payer = await loadPayer(connection);

		let bal = await connection.getBalance(payer.publicKey);

		console.log('Payer balance of', payer.publicKey.toString(), 'is', bal, '(', bal / LAMPORTS_PER_SOL, 'SOL)');
	})();
} catch (er) {
	console.error(er);
}
