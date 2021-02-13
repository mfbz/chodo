const { LAMPORTS_PER_SOL } = require('@solana/web3.js');

const { getOurAccount } = require('./ourAccount');
const { getNodeConnection } = require('./nodeConnection');

// TODO

const main = async () => {
	console.log("Let's say hello to a Solana account...");
	const {
		connection,
		payer,
		programId,
		registers: [register],
	} = await init();

	let data = await reportHello(register, connection);
	console.log('Current data:', data);
	await sayHello(1, !data.toggleState, register, programId, payer, connection);
	data = await reportHello(register, connection);
	console.log('New data:', data);
	console.log('Success');
};

try {
	main();
} catch (er) {
	console.error(er);
}

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
