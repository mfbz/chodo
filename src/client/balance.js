const { LAMPORTS_PER_SOL } = require('@solana/web3.js');

// TODO REFRACTOR AND TAKE THESE FILES FROM https://github.com/mcf-rocks/simple-vote-tutorial/tree/master/src/client
const { getOurAccount } = require('./ourAccount');
const { getNodeConnection } = require('./nodeConnection');

// TODO

async function main() {
	const ourAccount = await getOurAccount();
	const connection = await getNodeConnection();

	console.log('-----');

	let bal = await connection.getBalance(ourAccount.publicKey);

	console.log('Balance of', ourAccount.publicKey.toString(), 'is', bal, '(', bal / LAMPORTS_PER_SOL, ')');

	console.log('-----');
}

main()
	.catch((err) => {
		console.error(err);
	})
	.then(() => process.exit());
