import { Connection, PublicKey } from '@solana/web3.js';
import { ProgramState } from '../program/state';
import { UserData } from '../program/state/store/user-data';

// The seed used to deterministically get the user account from wallet account
export const USER_SEED = 'user';

// Holds user account public key, data and useful methods to interact with the program
// In here i have united all the methods i can use to get data or do instructions on the chain for the user
export class User {
	publicKey: PublicKey;
	data: UserData;

	// Create a user only through methods
	private constructor(publicKey: PublicKey, data: UserData) {
		this.publicKey = publicKey;
		this.data = data;
	}

	static async fetch(connection: Connection, walletPk: PublicKey, programId: PublicKey) {
		const userPk = await User.getPublicKeyFromSeed(walletPk, programId);
		const userInfo = await connection.getAccountInfo(userPk);

		if (userInfo != null) {
			// Get buffer from info data
			const buffer = Buffer.from(userInfo.data);
			// Decode buffer to user data
			const data = ProgramState.decodeUserData(buffer);

			// Return a new user with data taken from the user account
			return new User(userPk, data);
		}
		return null;
	}

	static async getPublicKeyFromSeed(walletPk: PublicKey, programId: PublicKey) {
		return await PublicKey.createWithSeed(walletPk, USER_SEED, programId);
	}
}
