import { AccountMeta, TransactionInstruction } from '@solana/web3.js';
import { APP_PROGRAM_ID } from './constants/instruction-constants';
import { SetProjectDataParams, SetTaskDataParams, SetUserDataParams } from './interfaces/instruction-schema';
import { encodeAppInstructionData } from './utils/instruction-encode-decode';

// DOCS: https://github.com/project-serum/serum-ts/blob/a5b6a5d0e70e9778573cf27f79136d9501e3ffa6/packages/token/src/instructions.ts#L153

// Here i can return a transaction for each possible App instruction i need
export class ProgramInstruction {
	static setUserData(keys: AccountMeta[], { name }: SetUserDataParams): TransactionInstruction {
		return new TransactionInstruction({
			keys,
			data: encodeAppInstructionData({
				setUserData: {
					name,
				},
			}),
			programId: APP_PROGRAM_ID,
		});
	}

	static setProjectData(keys: AccountMeta[], { index, name }: SetProjectDataParams): TransactionInstruction {
		return new TransactionInstruction({
			keys,
			data: encodeAppInstructionData({
				setProjectData: {
					index,
					name,
				},
			}),
			programId: APP_PROGRAM_ID,
		});
	}

	static setTaskData(keys: AccountMeta[], { index, message, completed }: SetTaskDataParams): TransactionInstruction {
		return new TransactionInstruction({
			keys,
			data: encodeAppInstructionData({
				setTaskData: {
					index,
					message,
					completed,
				},
			}),
			programId: APP_PROGRAM_ID,
		});
	}
}
