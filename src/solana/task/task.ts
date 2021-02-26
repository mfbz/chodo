import { Connection, PublicKey } from '@solana/web3.js';
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

	// NB: Project pk
	static async fetch(connection: Connection, projectPk: PublicKey, programId: PublicKey, index: number) {
		const taskPk = await Task.getPublicKeyFromSeed(projectPk, programId, index);
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

	// NB: Project pk
	static async fetchAll(connection: Connection, projectPk: PublicKey, programId: PublicKey) {
		const tasks = [];

		let index = TASK_STARTING_INDEX;
		// Cycle indefinitely to get all the possible tasks from starting index
		while (true) {
			// Fetch the task at index
			const task = await Task.fetch(connection, projectPk, programId, index);

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

	static getSeed(index: number) {
		// The index of the task is used to determine univocally it from the user
		// To deterministically derive tasks from the user i need to identify them with a seed that depends on the index of the message
		// The seed is what i can use to map my user and program to a specific task
		return TASK_SEED + index.toString();
	}

	// NB: From projectPk
	static async getPublicKeyFromSeed(projectPk: PublicKey, programId: PublicKey, index: number) {
		// NB: Create from project public key because of their parent/child relation
		// This is also so that the seed is relative to project pk
		const seed = Task.getSeed(index);
		return await PublicKey.createWithSeed(projectPk, seed, programId);
	}
}
