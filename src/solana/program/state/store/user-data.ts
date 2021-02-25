import { Layout } from '@project-serum/borsh';
import { struct, utf8 } from 'buffer-layout';

export interface UserData {
	name: string;
}

// Size is 55, 1 byte per character FOR NAME
export const USER_DATA_LAYOUT: Layout<UserData> = struct([utf8(55, 'name')]);
