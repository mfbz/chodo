import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { Project } from '../../project';
import { Task } from '../../task';
import { User } from '../../user/user';
import { WalletAdapter } from '../../wallet';
import { ProgramInstruction } from '../instruction';
import { ProjectData, PROJECT_DATA_LAYOUT } from '../state/schema/project-data';
import { TaskData, TASK_DATA_LAYOUT } from '../state/schema/task-data';
import { UserData, USER_DATA_LAYOUT } from '../state/schema/user-data';
import { sendSignedTransaction } from './utils/send-signed-transaction';

// A list of useful static methods that send transaction to solana
// It's here for a pratical purpose: have all the transaction i can do in one place near program-like stuff
// Throw if there is a problem, i catch in invoking methods
export class ProgramTransaction {
	static async createEmptyUserAccount(connection: Connection, wallet: WalletAdapter, programId: PublicKey) {
		if (!wallet.publicKey) {
			throw new Error('The wallet does not have a public key');
		}
		// Derive the user public key by generating from seed
		const userPk = await User.getPublicKeyFromSeed(wallet.publicKey, programId);

		// Calculate minimum balance for rent exemption depending on occupied space by the account
		// This is to avoid that the account is deleted after some epoch
		const rentExemptionLamports = await connection.getMinimumBalanceForRentExemption(USER_DATA_LAYOUT.span);

		// Create a transaction to create the user account in a deterministic way derived from wallet public key
		const transaction = new Transaction();
		// Create the instruction
		const instruction = SystemProgram.createAccountWithSeed({
			fromPubkey: wallet.publicKey,
			lamports: rentExemptionLamports,
			space: USER_DATA_LAYOUT.span,
			basePubkey: wallet.publicKey,
			seed: User.getSeed(),
			programId,
			newAccountPubkey: userPk,
		});
		// Add to the transaction to be executed
		transaction.add(instruction);

		// Send the transaction signing it with wallet
		sendSignedTransaction(connection, wallet, transaction);
		console.log('createEmptyUserAccount transaction completed succesfully');
	}

	static async setUserAccountData(connection: Connection, wallet: WalletAdapter, programId: PublicKey, data: UserData) {
		if (!wallet.publicKey) {
			throw new Error('The wallet does not have a public key');
		}
		// Derive the user public key by generating from seed
		const userPk = await User.getPublicKeyFromSeed(wallet.publicKey, programId);

		// These are the accounts passed to the transaction
		const keys = [
			{ pubkey: wallet.publicKey, isSigner: true, isWritable: false },
			{ pubkey: userPk, isSigner: false, isWritable: true },
		];

		// Create the transaction to be executed
		const transaction = new Transaction();
		// Create the instruction
		const instruction = ProgramInstruction.setUserData(keys, data);
		// Add to the tx to be executed
		transaction.add(instruction);

		// Send the transaction signing it with wallet
		sendSignedTransaction(connection, wallet, transaction);
		console.log('setUserAccountData transaction completed succesfully');
	}

	static async createEmptyProjectAccount(
		connection: Connection,
		wallet: WalletAdapter,
		programId: PublicKey,
		userPk: PublicKey,
		index: number,
	) {
		if (!wallet.publicKey) {
			throw new Error('The wallet does not have a public key');
		}
		// Derive poject public key from userpk and seed
		const projectPk = await Project.getPublicKeyFromSeed(userPk, programId, index);

		// Calculate minimum balance for rent exemption depending on occupied space by the account
		// This is to avoid that the account is deleted after some epoch
		const rentExemptionLamports = await connection.getMinimumBalanceForRentExemption(PROJECT_DATA_LAYOUT.span);

		// Create a transaction to create the user account in a deterministic way derived from wallet public key
		const transaction = new Transaction();
		// Create the instruction
		const instruction = SystemProgram.createAccountWithSeed({
			fromPubkey: wallet.publicKey, // From where to transfer the lamports, always the wallet
			lamports: rentExemptionLamports,
			space: PROJECT_DATA_LAYOUT.span,
			basePubkey: userPk,
			seed: Project.getSeed(index),
			programId,
			newAccountPubkey: projectPk,
		});
		// Add to the transaction to be executed
		transaction.add(instruction);

		// Send the transaction signing it with wallet
		sendSignedTransaction(connection, wallet, transaction);
		console.log('createEmptyProjectAccount transaction completed succesfully');
	}

	static async setProjectAccountData(
		connection: Connection,
		wallet: WalletAdapter,
		programId: PublicKey,
		data: ProjectData,
		userPk: PublicKey,
		index: number,
	) {
		if (!wallet.publicKey) {
			throw new Error('The wallet does not have a public key');
		}
		// Derive poject public key from userpk and seed
		const projectPk = await Project.getPublicKeyFromSeed(userPk, programId, index);

		// These are the accounts passed to the transaction
		const keys = [
			{ pubkey: wallet.publicKey, isSigner: true, isWritable: false },
			{ pubkey: userPk, isSigner: false, isWritable: false },
			{ pubkey: projectPk, isSigner: false, isWritable: true },
		];

		// Create the transaction to be executed
		const transaction = new Transaction();
		// Create the instruction
		const instruction = ProgramInstruction.setProjectData(keys, data);
		// Add to the tx to be executed
		transaction.add(instruction);

		// Send the transaction signing it with wallet
		sendSignedTransaction(connection, wallet, transaction);
		console.log('setProjectAccountData transaction completed succesfully');
	}

	static async createEmptyTaskAccount(
		connection: Connection,
		wallet: WalletAdapter,
		programId: PublicKey,
		projectPk: PublicKey,
		index: number,
	) {
		if (!wallet.publicKey) {
			throw new Error('The wallet does not have a public key');
		}
		// Derive task from project pk
		const taskPk = await Task.getPublicKeyFromSeed(projectPk, programId, index);

		// Calculate minimum balance for rent exemption depending on occupied space by the account
		// This is to avoid that the account is deleted after some epoch
		const rentExemptionLamports = await connection.getMinimumBalanceForRentExemption(TASK_DATA_LAYOUT.span);

		// Create a transaction to create the user account in a deterministic way derived from wallet public key
		const transaction = new Transaction();
		// Create the instruction
		const instruction = SystemProgram.createAccountWithSeed({
			fromPubkey: wallet.publicKey, // From where to transfer the lamports, always the wallet
			lamports: rentExemptionLamports,
			space: TASK_DATA_LAYOUT.span,
			basePubkey: projectPk,
			seed: Task.getSeed(index),
			programId,
			newAccountPubkey: taskPk,
		});
		// Add to the transaction to be executed
		transaction.add(instruction);

		// Send the transaction signing it with wallet
		sendSignedTransaction(connection, wallet, transaction);
		console.log('createEmptyTaskAccount transaction completed succesfully');
	}

	static async setTaskAccountData(
		connection: Connection,
		wallet: WalletAdapter,
		programId: PublicKey,
		data: TaskData,
		userPk: PublicKey,
		projectPk: PublicKey,
		index: number,
	) {
		if (!wallet.publicKey) {
			throw new Error('The wallet does not have a public key');
		}
		// Derive task from project pk
		const taskPk = await Task.getPublicKeyFromSeed(projectPk, programId, index);

		// These are the accounts passed to the transaction
		const keys = [
			{ pubkey: wallet.publicKey, isSigner: true, isWritable: false },
			{ pubkey: userPk, isSigner: false, isWritable: false },
			{ pubkey: projectPk, isSigner: false, isWritable: false },
			{ pubkey: taskPk, isSigner: false, isWritable: true },
		];

		// Create the transaction to be executed
		const transaction = new Transaction();
		// Create the instruction
		const instruction = ProgramInstruction.setTaskData(keys, data);
		// Add to the tx to be executed
		transaction.add(instruction);

		// Send the transaction signing it with wallet
		sendSignedTransaction(connection, wallet, transaction);
		console.log('setTaskAccountData transaction completed succesfully');
	}
}
