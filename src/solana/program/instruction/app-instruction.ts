import { AccountMeta, TransactionInstruction } from '@solana/web3.js';
import { APP_PROGRAM_ID } from './constants/instruction-constants';
import { CreateUserParams } from './interfaces/instruction-schema';
import { encodeAppInstructionData } from './utils/instruction-encode-decode';

// DOCS: https://github.com/project-serum/serum-ts/blob/a5b6a5d0e70e9778573cf27f79136d9501e3ffa6/packages/token/src/instructions.ts#L153

// Here i can return a transaction for each possible App instruction i need
export class AppInstruction {
	static createUser(keys: AccountMeta[], { name }: CreateUserParams): TransactionInstruction {
		return new TransactionInstruction({
			keys,
			data: encodeAppInstructionData({
				createUser: {
					name,
				},
			}),
			programId: APP_PROGRAM_ID,
		});
	}
}


