const { sendAndConfirmTransaction, TransactionInstruction, Transaction } = require('@solana/web3.js');
const soproxABI = require('soprox-abi');
const init = require('./utils/init');

// Say hello
const sayHello = async (amount, toggle, register, programId, payer, connection) => {
	console.log('Saying hello to', register.publicKey.toBase58());
	const layout = new soproxABI.struct(register.schema, {
		numGreets: amount,
		toggleState: toggle,
	});
	const code = new soproxABI.u8(0);
	const data = soproxABI.pack(code, layout);
	const instruction = new TransactionInstruction({
		keys: [{ pubkey: register.publicKey, isSigner: false, isWritable: true }],
		programId,
		data,
	});
	const transaction = new Transaction();
	transaction.add(instruction);
	await sendAndConfirmTransaction(connection, transaction, [payer], {
		skipPreflight: true,
		commitment: 'recent',
	});
};

// Report the number of times the greeted account has been said hello to
const reportHello = async (register, connection) => {
	const { data } = await connection.getAccountInfo(register.publicKey);
	if (!data) throw new Error('Cannot find data of', register.address);
	const layout = new soproxABI.struct(register.schema);
	layout.fromBuffer(data);
	return layout.value;
};

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
