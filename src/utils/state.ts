import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { bool, Layout, option, publicKey, u64 } from '@project-serum/borsh';
import { struct, utf8 } from 'buffer-layout';

export interface User {
	name: string;
}

// Size is 55, 1 byte per character
export const User: Layout<User> = struct([
	utf8(55, 'name'),
]);

export function decodeUserAccountData(data: Buffer): User {
	return User.decode(data);
}