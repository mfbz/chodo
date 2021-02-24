const {
	sendAndConfirmTransaction,
	TransactionInstruction,
	Transaction,
	PublicKey,
	SystemProgram,
} = require('@solana/web3.js');
const { loadPayer, establishConnection } = require('./lib/network');
const temp = require('./lib/temp');
const borsh = require('borsh');

// https://github.com/near/borsh-js/pull/4/commits/2fff73a61bc0241c0d3864b248a4ccb446c476a3
// https://github.com/near/borsh-js/blob/117067518b76f9821352ea6ef6002506c61a57de/lib/index.js#L258
class User {
	constructor(data) {
		Object.assign(this, data);
	}
}

class Instruction {
	constructor(data) {
		// The deserializer decodes bytes into an object, and pass that as
		// the only argument to the constructor
		//
		// This constructor assign the keys-values to `this`.
		Object.assign(this, data);
	}
}

class InstructionData {
	constructor(data) {
		Object.assign(this, data);
	}
}

// User needed data
const UserCreateWithSeed = async (accountPk, programId) => {
	// Create an account in a deterministic way from account pk, seed and program id
	return await PublicKey.createWithSeed(accountPk, 'user', programId);
};
const CreateUser = async (connection, payer, programId, { name }) => {
	// Create a user account in a deterministic way using chodo keyword as seed phrase
	const userAccountPk = await UserCreateWithSeed(payer.publicKey, programId);

	// Check if user account already exists or not
	const userExists = (await connection.getAccountInfo(userAccountPk)) !== null;

	// If the account doesn't exists i need to create one for the user
	if (!userExists) {
		const UserAccountSpace = 200; // Only name and this is its maximum size
		const UserAccountSeed = 'user';

		// Calculate minimum balance for rent exemption depending on occupied space by the account
		const rentExemption = await connection.getMinimumBalanceForRentExemption(UserAccountSpace);

		const createProfileTx = SystemProgram.createAccountWithSeed({
			fromPubkey: payer.publicKey,
			lamports: rentExemption,
			space: UserAccountSpace,
			basePubkey: payer.publicKey,
			seed: UserAccountSeed,
			programId,
			newAccountPubkey: userAccountPk,
		});
		console.log('1');

		await sendAndConfirmTransaction(connection, new Transaction().add(createProfileTx), [payer]);
		console.log('New user account created: ' + userAccountPk);
	} else {
		console.log('User account: ' + userAccountPk);
	}

	// Build up the transaction with keys that are the account, program id and data
	// This is like the starting point of rust program
	const instructionDataBuf = borsh.serialize(
		new Map([
			[
				InstructionData,
				{
					kind: 'struct',
					fields: [['name', 'string']],
				},
			],
		]),
		new InstructionData({ name: 'MFBZ' }),
	);
	const dataToU8Array = new Uint8Array(instructionDataBuf);
	const instruction = new TransactionInstruction({
		keys: [
			{ pubkey: payer.publicKey, isSigner: true, isWritable: false },
			{ pubkey: userAccountPk, isSigner: false, isWritable: true },
		],
		programId,
		data: borsh.serialize(
			new Map([
				[
					Instruction,
					{
						kind: 'enum',
						field: 'instruction',
						values: [['CreateUser', [dataToU8Array.length]]],
					},
				],
			]),
			new Instruction({ instruction: 'CreateUser', CreateUser: dataToU8Array }),
		),
	});
	console.log('Instruction built');

	return new Transaction().add(instruction);
};

// The main function that create a chodo user
const createUser = async (name, programId, payer, connection) => {
	console.log('Creating a user with name:', name);

	// Create a user account in a deterministic way using chodo keyword as seed phrase
	//const userAccountPk = await UserCreateWithSeed(payer.publicKey, programId);

	// Create the transaction for create user from CreateUser function like the one in rust program
	const tx = await CreateUser(connection, payer, programId, { name });

	// Send Effective CreateUser transaction
	// More than create user is SET USER DATA
	// This is because user is created through the system program to be rent exempt etc => create the account with its infos
	// And then with this transaction i set its data by passing params to my program trough a transaction
	await sendAndConfirmTransaction(connection, tx, [payer]);
};

// Read a user account
const readUser = async (connection, payer, programId) => {
	// This is the user account i'm creating and i can get it deterministically like this
	const userAccountPk = await UserCreateWithSeed(payer.publicKey, programId);

	const userData = await connection.getAccountInfo(userAccountPk);
	if (userData != null) {
		// Now i have to decode back the data
		const schema = new Map([
			[
				User,
				{
					kind: 'struct',
					fields: [['name', 'string']],
				},
			],
		]);

		return borsh.deserialize(schema, User, userData.data);
	}
	return null;
};

try {
	(async () => {
		console.log('Create a chodo user for payer');
		const connection = await establishConnection();

		// Use the second user to test the usage of the program from another user not the one who created it
		const payer = await loadPayer(connection, 0);

		// Load program data to create needed variables
		const program = temp.load('program');
		// Create program id to be used for calling it on the blockchain
		const programId = new PublicKey(program.address);

		// Call create user functin to really create a chodo user onchain through my program
		await createUser('mfbz', programId, payer, connection);
		console.log('User account created');

		// Now read the newly created user account
		const newUserAccountData = await readUser(connection, payer, programId);
		console.log('New user account data');
		console.log(newUserAccountData);
	})();
} catch (er) {
	console.error(er);
}
