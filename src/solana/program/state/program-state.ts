import { UserData, USER_DATA_LAYOUT } from './store/user-data';

// Here i export the methods i can use to decode data from accountInfo.data taken from on-chain accounts
// Decode data from byte array
export class ProgramState {
	static decodeUserData(data: Buffer): UserData {
		return USER_DATA_LAYOUT.decode(data);
	}
}
