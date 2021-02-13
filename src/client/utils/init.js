const { PublicKey } = require('@solana/web3.js');
const { establishConnection, loadPayer } = require('../../../lib/network');
const store = require('../../../lib/store');

module.exports = async () => {
	const connection = await establishConnection();
	const payer = await loadPayer(connection);
	const program = store.load('program');
	const programId = new PublicKey(program.address);
	const registers = store.load('abi').schema.map((register) => {
		register.publicKey = new PublicKey(register.address);
		return register;
	});
	return { connection, payer, programId, registers };
};
