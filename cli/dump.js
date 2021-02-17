const { PublicKey } = require('@solana/web3.js');
const { establishConnection, loadPayer } = require('./lib/network');
var argv = require('yargs/yargs')(process.argv.slice(2)).argv;

/*
 * Dump the data saved into an account
 */

try {
	(async () => {
		const connection = await establishConnection();

		// Account pubkey from payer by default, otherwise overwrite
		let pk = (await loadPayer(connection)).publicKey;
		// Get pubkey solana object for the passed pubkey if did so
		if (argv.pubkey) {
			console.log('Looking at account:', argv.pubkey);
			pk = new PublicKey(argv.pubkey);
		}

		if (!pk) {
			return console.error('Account not found on chain');
		}

		// Get account info
		const info = await connection.getAccountInfo(pk);
		// Log the whole account data info
		console.log(info);

		// Get the owner of the account
		let owner = new PublicKey(info.owner._bn);
		console.log('Owner PubKey:', owner.toString());
	})();
} catch (er) {
	console.error(er);
}
