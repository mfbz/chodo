import { Connection, MAX_SEED_LENGTH, PublicKey } from '@solana/web3.js';
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

	static async fetch(
		connection: Connection,
		walletPk: PublicKey,
		programId: PublicKey,
		userPk: PublicKey,
		index: number,
	) {
		const projectPk = await Project.getPublicKeyFromSeed(walletPk, programId, userPk, index);
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

	static async fetchAll(connection: Connection, walletPk: PublicKey, programId: PublicKey, userPk: PublicKey) {
		const projects = [];

		let index = PROJECT_STARTING_INDEX;
		// Cycle indefinitely to get all the possible projects from starting index
		while (true) {
			// Fetch the project at index
			const project = await Project.fetch(connection, walletPk, programId, userPk, index);

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

	static getSeed(userPk: PublicKey, index: number) {
		// The userPk and the index of the project are used to determine univocally it from the user
		// NB: Concat the public key at the end so if it's cut i still map to the same user for identification
		return (PROJECT_SEED + index.toString() + userPk.toString()).substring(0, MAX_SEED_LENGTH);
	}

	// NB: The creator MUST be always the wallet because otherwise i would need also userpk signer key
	static async getPublicKeyFromSeed(walletPk: PublicKey, programId: PublicKey, userPk: PublicKey, index: number) {
		// NB: Create from user public key because of their parent/child relation
		// This is also so that the seed is relative to user pk
		const seed = Project.getSeed(userPk, index);
		return await PublicKey.createWithSeed(walletPk, seed, programId);
	}
}
