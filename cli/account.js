const { PublicKey, Account, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const { establishConnection } = require('./lib/network');
const soproxConf = require('../soprox.config.json');
const path = require('path');
const fs = require('fs');
const sleep = require('./utils/sleep');
var argv = require('yargs/yargs')(process.argv.slice(2)).argv;

/*
 * Create or add a new payer account to the network and soprox config file
 */

// Airdrop SOL to selected address
// current max on devnet is 10 Sol, might change in the future, adjust accordingly
const airdrop = async (address, lamports = 10000000000) => {
	if (!address) throw new Error('Invalid address');

	const connection = await establishConnection();

	let retries = 10;
	const publicKey = new PublicKey(address);
	await connection.requestAirdrop(publicKey, lamports);

	while (retries > 0) {
		await sleep(500);
		const balance = await connection.getBalance(publicKey);
		if (lamports <= balance) return console.log(`Current balance of ${address} is ${balance / LAMPORTS_PER_SOL} SOL`);
		console.warn('⚠️ Airdrop retry ' + retries);
		retries -= 1;
	}

	return console.error(`Airdrop of ${lamports / LAMPORTS_PER_SOL} SOL failed`);
};

try {
	(async () => {
		// Create a new account
		const payer = new Account();
		// Do an airdrop to the account creating it
		await airdrop(payer.publicKey.toBase58());

		console.log('A new payer is created. Details:');
		console.info('\tAddress:', payer.publicKey.toBase58());
		console.info('\tPublic key:', payer.publicKey.toBuffer().toString('hex'));
		console.info('\tSecret key:', Buffer.from(payer.secretKey).toString('hex'));

		// The directory in which the store is created
		const DIR = path.join(__dirname);

		if (argv.add) {
			// Add a new payer to existing ones
			try {
				fs.mkdirSync(DIR);
			} catch (er) {
				// Nothing
			}

			let filename = path.join(DIR, '../soprox.config.json');
			let data = JSON.stringify(
				{
					...soproxConf,
					payers: [
						...soproxConf.payers,
						{
							address: payer.publicKey.toBase58(),
							secretKey: Buffer.from(payer.secretKey).toString('hex'),
						},
					],
				},
				null,
				2,
			);

			fs.writeFileSync(filename, data, 'utf8');
		} else {
			// Overwrite existing one
			try {
				fs.mkdirSync(DIR);
			} catch (er) {
				// Nothing
			}

			let filename = path.join(DIR, '../soprox.config.json');
			let data = JSON.stringify(
				{
					...soproxConf,
					payers: [
						{
							address: payer.publicKey.toBase58(),
							secretKey: Buffer.from(payer.secretKey).toString('hex'),
						},
					],
				},
				null,
				2,
			);

			fs.writeFileSync(filename, data, 'utf8');
		}

		console.log('Payer data saved into config file');
	})();
} catch (er) {
	console.log('!"£!"£"£!"£"£!"££!"£!"');
	console.error(er);
}
