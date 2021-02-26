import { Connection, PublicKey } from '@solana/web3.js';
import { ProgramState } from '../program/state';
import { ProjectData } from '../program/state/schema/project-data';

// The seed used to deterministically get the project account from wallet account
export const PROJECT_SEED = 'project';
export const PROJECT_STARTING_INDEX = 0;

// Holds project account public key, data and useful methods to interact with the program
// NB: A little different from normal account because this needs to be derived DETERMINISTICALLY from the user pk
// but due to the fact that i can have multiple projects i have to add an index that make the seed univoque
// When i need to retrieve them i can just start from initial index and get project accounts incrementing index until nothing found
export class Project {
	publicKey: PublicKey;
	data: ProjectData;

	// Create a project only through methods
	private constructor(publicKey: PublicKey, data: ProjectData) {
		this.publicKey = publicKey;
		this.data = data;
	}

	// NB: User pk
	static async fetch(connection: Connection, userPk: PublicKey, programId: PublicKey, index: number) {
		const projectPk = await Project.getPublicKeyFromSeed(userPk, programId, index);
		const projectInfo = await connection.getAccountInfo(projectPk);

		if (projectInfo != null) {
			// Get buffer from info data
			const buffer = Buffer.from(projectInfo.data);
			// Decode buffer to project data
			const data = ProgramState.decodeProjectData(buffer);

			// Return a new project with data taken from the project account
			return new Project(projectPk, data);
		}
		return null;
	}

	// NB: User pk
	static async fetchAll(connection: Connection, userPk: PublicKey, programId: PublicKey) {
		const projects = [];

		let index = PROJECT_STARTING_INDEX;
		// Cycle indefinitely to get all the possible projects from starting index
		while (true) {
			// Fetch the project at index
			const project = await Project.fetch(connection, userPk, programId, index);

			if (project) {
				// Return a new project with data taken from the project account
				projects.push(project);
			} else {
				// No project account at index, i reached the end, break
				break;
			}

			// Increment index to search for next project
			index++;
		}

		return projects;
	}

	static getSeed(index: number) {
		// The index of the project is used to determine univocally it from the user
		// To deterministically derive projects from the user i need to identify them with a seed that depends on the index of the message
		// The seed is what i can use to map my user and program to a specific project
		return PROJECT_SEED + index.toString();
	}

	// NB: From userPK
	static async getPublicKeyFromSeed(userPk: PublicKey, programId: PublicKey, index: number) {
		// NB: Create from user public key because of their parent/child relation
		// This is also so that the seed is relative to user pk
		const seed = Project.getSeed(index);
		return await PublicKey.createWithSeed(userPk, seed, programId);
	}
}
