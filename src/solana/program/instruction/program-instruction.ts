import { AccountMeta, PublicKey, TransactionInstruction } from '@solana/web3.js';
import soproxABI from 'soprox-abi';
import { PROJECT_DATA_SCHEMA } from '../state/schema/project-data';
import { TASK_DATA_SCHEMA } from '../state/schema/task-data';
import { USER_DATA_SCHEMA } from '../state/schema/user-data';

// TODO GET IT PROGRAMMATICALLY WHEN BUILDING PROGRAM
export const APP_PROGRAM_ID = new PublicKey('BJT7bwqcnXRiw9B96RiXWL4bKgHwXr4cPW8T8CTkzyNk');

export class ProgramInstruction {
	static setUserData(
		keys: AccountMeta[],
		{
			name,
		}: {
			name: string;
		},
	): TransactionInstruction {
		// The code for the instruction to call
		const tagData = new soproxABI.u8(0);
		// Object data
		const restData = new soproxABI.struct(USER_DATA_SCHEMA, { name });
		// Pack passed data toghether
		const data = soproxABI.pack(tagData, restData);

		return new TransactionInstruction({
			keys,
			data,
			programId: APP_PROGRAM_ID,
		});
	}

	static setProjectData(
		keys: AccountMeta[],
		{
			index,
			name,
		}: {
			index: number;
			name: string;
		},
	): TransactionInstruction {
		// The code for the instruction to call
		const tagData = new soproxABI.u8(1);
		// Object data
		const restData = new soproxABI.struct(PROJECT_DATA_SCHEMA, { index, name });
		// Pack passed data toghether
		const data = soproxABI.pack(tagData, restData);

		return new TransactionInstruction({
			keys,
			data,
			programId: APP_PROGRAM_ID,
		});
	}

	static setTaskData(
		keys: AccountMeta[],
		{
			index,
			message,
			completed,
		}: {
			index: number;
			message: string;
			completed: boolean;
		},
	): TransactionInstruction {
		// The code for the instruction to call
		const tagData = new soproxABI.u8(2);
		// Object data
		const restData = new soproxABI.struct(TASK_DATA_SCHEMA, { index, message, completed });
		// Pack passed data toghether
		const data = soproxABI.pack(tagData, restData);

		return new TransactionInstruction({
			keys,
			data,
			programId: APP_PROGRAM_ID,
		});
	}
}
