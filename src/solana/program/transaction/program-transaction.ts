import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import { Project } from '../../project';
import { Task } from '../../task';
import { User } from '../../user/user';
import { WalletAdapter } from '../../wallet';
import { ProgramInstruction } from '../instruction';
import { ProjectData } from '../state/schema/project-data';
import { TaskData } from '../state/schema/task-data';
import { UserData } from '../state/schema/user-data';
import { sendSignedTransaction } from './utils/send-signed-transaction';

// TODOOOOO: SET SPAN DIRECTLY BECAUSE LAYOUT.SPAN DOESN'T WORK!!!

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
		const rentExemptionLamports = await connection.getMinimumBalanceForRentExemption(55);

		// Create the instruction
		const instruction = SystemProgram.createAccountWithSeed({
			fromPubkey: wallet.publicKey,
			lamports: rentExemptionLamports,
			space: 55,
			basePubkey: wallet.publicKey,
			seed: User.getSeed(),
			programId,
			newAccountPubkey: userPk,
		});

		// Send the transaction signing it with wallet
		await sendSignedTransaction(connection, wallet, [instruction], []);
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

		// Create the instruction
		const instruction = ProgramInstruction.setUserData(keys, data);
		console.log('INSTRUCTION', instruction);

		// Send the transaction signing it with wallet
		await sendSignedTransaction(connection, wallet, [instruction], []);
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
		const rentExemptionLamports = await connection.getMinimumBalanceForRentExemption(132);

		// Create the instruction
		const instruction = SystemProgram.createAccountWithSeed({
			fromPubkey: wallet.publicKey, // From where to transfer the lamports, always the wallet
			lamports: rentExemptionLamports,
			space: 132,
			basePubkey: userPk,
			seed: Project.getSeed(index),
			programId,
			newAccountPubkey: projectPk,
		});

		// Send the transaction signing it with wallet
		await sendSignedTransaction(connection, wallet, [instruction], []);
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

		// Create the instruction
		const instruction = ProgramInstruction.setProjectData(keys, data);

		// Send the transaction signing it with wallet
		await sendSignedTransaction(connection, wallet, [instruction], []);
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
		const rentExemptionLamports = await connection.getMinimumBalanceForRentExemption(173);

		// Create the instruction
		const instruction = SystemProgram.createAccountWithSeed({
			fromPubkey: wallet.publicKey, // From where to transfer the lamports, always the wallet
			lamports: rentExemptionLamports,
			space: 173,
			basePubkey: projectPk,
			seed: Task.getSeed(index),
			programId,
			newAccountPubkey: taskPk,
		});

		// Send the transaction signing it with wallet
		await sendSignedTransaction(connection, wallet, [instruction], []);
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

		// Create the instruction
		const instruction = ProgramInstruction.setTaskData(keys, data);

		// Send the transaction signing it with wallet
		await sendSignedTransaction(connection, wallet, [instruction], []);
		console.log('setTaskAccountData transaction completed succesfully');
	}
}
