const fs = require('fs');
const { loadPayer, establishConnection, loadProgram, loadRegisters } = require('./lib/network');

/*
 * Connect to the network, load the payer, the program and load registers
 * Registers are state account and they are not deployed now because i need only to deploy the program.
 * The payer is needed because it's the owner of the program account and the main account paying for deploy.
 */

// Read the created program file to serialize and pack it to deploy on the network
// NB: Remember that the path is relative to root folder!
const programData = fs.readFileSync('./dist/program/main.so');
// Get the schema to load registers
//const schema = require('../soprox.schema.json');

(async () => {
	const connection = await establishConnection();
	const payer = await loadPayer(connection);
	const program = await loadProgram(programData, payer, connection);

	console.log('Deployment Info:');
	console.log('\tProgram:', program.address);

	/*
	const registers = await loadRegisters(schema, payer, program, connection);

	
	registers.forEach(({ address, key }) => {
		console.log(`\tRegister \'${key}\': ${address}`);
	});
	*/
})();
