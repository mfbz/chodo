const { PublicKey } = require('@solana/web3.js');
const { establishConnection, loadPayer } = require('../../../lib/network');
const store = require('../../../lib/store');

/*
 * Connect to selected network load needed data and return it ready to be used.
 */

module.exports = async (network) => {
	const connection = await establishConnection(network);

	const payer = await loadPayer(connection);

	const program = store.load('program');
	const programId = new PublicKey(program.address);

	const registers = store.load('abi').schema.map((register) => {
		register.publicKey = new PublicKey(register.address);
		return register;
	});

	return { connection, payer, programId, registers };
};
