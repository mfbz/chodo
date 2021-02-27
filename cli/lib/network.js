const {
	Account,
	Connection,
	BPF_LOADER_DEPRECATED_PROGRAM_ID,
	SystemProgram,
	Transaction,
	sendAndConfirmTransaction,
	BpfLoader,
	LAMPORTS_PER_SOL,
	PublicKey,
} = require('@solana/web3.js');
const soproxABI = require('soprox-abi');
const temp = require('./temp');
const soproxConf = require('../../soprox.config.json');

/**
 * List of common and useful methods to be used to handle network stuff
 */

// The network i'll use for my scripts
const NETWORK = soproxConf.network.active;

// Establish a connection to the cluster
const establishConnection = async () => {
	// Connect to devnet network
	const connection = new Connection(NETWORK, 'recent');
	const version = await connection.getVersion();

	console.log('Connection to cluster established:', NETWORK, version);
	// Return just opened connection
	return connection;
};

// Establish an account to pay for everything
const loadPayer = async (connection, index = 0) => {
	const _payer = soproxConf.payers[index];
	if (!_payer || !_payer.secretKey) throw new Error('Not setup payers yet');

	// Get an account from inserted payer secret key to be able to sign things
	const payer = new Account(Buffer.from(_payer.secretKey, 'hex'));

	// If too low SOL i could get an error, so request an airdrop and trigger an error if so
	if (connection.getBalance(payer.publicKey) < 10 * LAMPORTS_PER_SOL) {
		return console.warn(
			'Your balance is lower than 10 SOl. You may need to airdrop some to prevent unintended errors.',
		);
	}
	return payer;
};

// Deploy a program to the cluster
const deployProgram = async (data, payer, connection) => {
	// Get a fresh new account for the program
	const program = new Account();

	// Deploy the program signing it with payer account
	await BpfLoader.load(connection, payer, program, data, BPF_LOADER_DEPRECATED_PROGRAM_ID);
	return program;
};

// Deploy a register to the cluster, a register is an account used to store data
const deployRegister = async (space, payer, programId, connection) => {
	// Create a new register account
	const register = new Account();

	// Create a fresh new transaction
	let transaction = new Transaction();
	// Calculate the SOL needed to create a permanent account
	// State account MUST be rent exempted
	const lamports = await connection.getMinimumBalanceForRentExemption(space);

	// Add needed data tp the transaction by creating a program derived account from payer public key
	// In this way the data is connected to the payer account
	transaction.add(
		SystemProgram.createAccount({
			fromPubkey: payer.publicKey,
			newAccountPubkey: register.publicKey,
			lamports,
			space,
			programId,
		}),
	);

	// Send transaction
	await sendAndConfirmTransaction(connection, transaction, [payer, register], {
		skipPreflight: true,
		commitment: 'recent',
	});

	// Return the register account that has been just saved
	return register;
};

// Load the hello world BPF program if not already loaded
const loadProgram = async (data, payer, connection) => {
	// This is the name of the program file to load with program data inside
	const filename = 'program';

	// Check if the program has already been loaded
	const config = temp.load(filename);

	// Try to get the program from temp file
	// If it has the same data just return it, it's the same
	/*
	if (config && Buffer.from(data).toString('hex') == config.data) {
		console.log('The program has been loaded at:', config.address);
		const program = {
			id: new PublicKey(config.address),
			...config,
		};
		return program;
	}
	*/

	// Deploy the program
	const _program = await deployProgram(data, payer, connection);
	const address = _program.publicKey.toBase58();
	console.log('Deploying the program:', address);

	// Save this info for next time
	let program = {
		address,
		secretKey: Buffer.from(_program.secretKey).toString('hex'),
		data: Buffer.from(data).toString('hex'),
	};
	temp.save(filename, program);
	program.publicKey = _program.publicKey;

	// Return the newly created program
	return program;
};

// Load registers data accounts
const loadRegisters = async (schema, payer, program, connection) => {
	// This is the name of the register file to load with data accounts inside
	const filename = 'abi';
	const data = temp.load(filename);

	// Return a list of data accounts called registers from schema if present
	const { programAddress, schema: storedSchema } = data || {};
	if (programAddress == program.address && storedSchema)
		return storedSchema.map((register) => {
			register.publicKey = new PublicKey(program.address);
			return register;
		});

	// Otherwise create the registers from the schema by deploying them and then return them
	const layout = await Promise.all(
		schema.map(async (each) => {
			const space = soproxABI.span(each);
			const account = await deployRegister(space, payer, program.publicKey, connection);
			each.address = account.publicKey.toBase58();
			each.secretKey = Buffer.from(account.secretKey).toString('hex');
			return each;
		}),
	);
	temp.save(filename, {
		programAddress: program.address,
		schema: layout,
	});
	return layout.map((register) => {
		register.publicKey = new PublicKey(register.address);
		return register;
	});
};

module.exports = {
	establishConnection,
	loadPayer,
	deployProgram,
	deployRegister,
	loadProgram,
	loadRegisters,
};
