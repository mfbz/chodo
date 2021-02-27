import { Layout, str, struct } from '@project-serum/borsh';

export interface UserData {
	name: string;
}

// Size is 55, 1 byte per character FOR NAME
// 55
export const USER_DATA_LAYOUT: Layout<UserData> = struct([str('name')]);
