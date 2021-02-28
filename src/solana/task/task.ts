import { Connection, MAX_SEED_LENGTH, PublicKey } from '@solana/web3.js';
import { ProgramState } from '../program/state';
import { TaskData } from '../program/state/schema/task-data';

// The seed used to deterministically get the task account from wallet account
export const TASK_SEED = 'task';
export const TASK_STARTING_INDEX = 0;

// Holds task account public key, data and useful methods to interact with the program
// NB: A little different from normal account because this needs to be derived DETERMINISTICALLY from the user pk
// but due to the fact that i can have multiple tasks i have to add an index that make the seed univoque
// When i need to retrieve them i can just start from initial index and get task accounts incrementing index until nothing found
export class Task {
	publicKey: PublicKey;
	data: TaskData;

	// Create a task only through methods
	private constructor(publicKey: PublicKey, data: TaskData) {
		this.publicKey = publicKey;
		this.data = data;
	}

	static async fetch(
		connection: Connection,
		walletPk: PublicKey,
		programId: PublicKey,
		projectPk: PublicKey,
		index: number,
	) {
		const taskPk = await Task.getPublicKeyFromSeed(walletPk, programId, projectPk, index);
		const taskInfo = await connection.getAccountInfo(taskPk);

		if (taskInfo != null) {
			// Get buffer from info data
			const buffer = Buffer.from(taskInfo.data);
			// Decode buffer to task data
			const data = ProgramState.decodeTaskData(buffer);

			// Return a new task with data taken from the task account
			return new Task(taskPk, data);
		}
		return null;
	}

	static async fetchAll(connection: Connection, walletPk: PublicKey, programId: PublicKey, projectPk: PublicKey) {
		const tasks = [];

		let index = TASK_STARTING_INDEX;
		// Cycle indefinitely to get all the possible tasks from starting index
		while (true) {
			// Fetch the task at index
			const task = await Task.fetch(connection, walletPk, programId, projectPk, index);

			if (task) {
				// Return a new task with data taken from the task account
				tasks.push(task);
			} else {
				// No task account at index, i reached the end, break
				break;
			}

			// Increment index to search for next task
			index++;
		}

		return tasks;
	}

	static getSeed(projectPk: PublicKey, index: number) {
		// The projectPk and the index of the project are used to determine univocally it from the user
		// NB: Concat the public key at the end so if it's cut i still map to the same user for identification
		return (TASK_SEED + index.toString() + projectPk.toString()).substring(0, MAX_SEED_LENGTH);
	}

	// NB: The creator MUST be always the wallet because otherwise i would need also projectpk signer key
	static async getPublicKeyFromSeed(walletPk: PublicKey, programId: PublicKey, projectPk: PublicKey, index: number) {
		// NB: Create from project public key because of their parent/child relation
		// This is also so that the seed is relative to project pk
		const seed = Task.getSeed(projectPk, index);
		return await PublicKey.createWithSeed(walletPk, seed, programId);
	}
}
