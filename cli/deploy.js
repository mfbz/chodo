const fs = require('fs');
const { loadPayer, establishConnection, loadProgram, loadRegisters } = require('./lib/network');

/*
 * Connect to the network, load the payer, the program and load registers
 */

// Read the created program file to serialize and pack it to deploy on the network
// NB: Remember that the path is relative to root folder!
const programData = fs.readFileSync('./dist/program/main.so');
// Get the schema to load registers
const schema = require('../soprox.schema.json');

(async () => {
	const connection = await establishConnection();
	const payer = await loadPayer(connection);
	const program = await loadProgram(programData, payer, connection);
	const registers = await loadRegisters(schema, payer, program, connection);

	console.log('Deployment Info:');
	console.log('\tProgram:', program.address);
	registers.forEach(({ address, key }) => {
		console.log(`\tRegister \'${key}\': ${address}`);
	});
})();
