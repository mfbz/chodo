// Size is 55, 1 byte for each char
export interface UserData {
	name: string;
}

// Soprox data schema for encoding and decoding
// https://soprox.descartes.network/development/soproxabi
export const USER_DATA_SCHEMA = [{ key: 'name', type: '[char;55]' }];
