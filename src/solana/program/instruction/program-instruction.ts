import { AccountMeta, PublicKey, TransactionInstruction } from '@solana/web3.js';
import soproxABI from 'soprox-abi';
import { PROJECT_DATA_SCHEMA } from '../state/schema/project-data';
import { TASK_DATA_SCHEMA } from '../state/schema/task-data';
import { USER_DATA_SCHEMA } from '../state/schema/user-data';

// TODO GET IT PROGRAMMATICALLY WHEN BUILDING PROGRAM
export const APP_PROGRAM_ID = new PublicKey('9o8Bv2uuySA4z8hTZBTc3wg1AQgLZGL9PhbL6K12o2yA');

export class ProgramInstruction {
	static setUserData(
		keys: AccountMeta[],
		{
			name,
			premium,
		}: {
			name: string;
			premium: boolean;
		},
	): TransactionInstruction {
		// The code for the instruction to call
		const tagData = new soproxABI.u8(0);
		// Object data strings need to be passed as array of chars
		// The first one is my correct utf bytes identifying char
		const nameCharArr = name.split('');
		// Concat N elements to make nameCharArr of the size of the SCHEMA so 55 * 4 bytes per char, so 55 elements
		const restData = new soproxABI.struct(USER_DATA_SCHEMA, {
			name: nameCharArr.length < 55 ? nameCharArr.concat(...Array(55 - nameCharArr.length).fill('')) : nameCharArr,
			premium,
		});
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
		const restData = new soproxABI.struct(PROJECT_DATA_SCHEMA, { index, name: name.split('') });
		// Tail + 1 for deconstruction purpose
		const tailData = new soproxABI.u8(0);
		// Pack passed data toghether
		const data = soproxABI.pack(tagData, restData, tailData);

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
		const restData = new soproxABI.struct(TASK_DATA_SCHEMA, { index, message: message.split(''), completed });
		// Tail + 1 for deconstruction purpose
		const tailData = new soproxABI.u8(0);
		// Pack passed data toghether
		const data = soproxABI.pack(tagData, restData, tailData);

		return new TransactionInstruction({
			keys,
			data,
			programId: APP_PROGRAM_ID,
		});
	}
}
