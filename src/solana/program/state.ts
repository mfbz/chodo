import { Layout } from '@project-serum/borsh';
import { struct, utf8 } from 'buffer-layout';

export interface User {
	name: string;
}

// Size is 55, 1 byte per character FOR NAME
export const USER_LAYOUT: Layout<User> = struct([utf8(55, 'name')]);

// Decode user data from byte array
export function decodeUserData(data: Buffer): User {
	return USER_LAYOUT.decode(data);
}
