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
		// Object data strings need to be passed as array of chars
		// The first one is my correct utf bytes identifying char
		const nameCharArr = name.split('');
		// Concat N elements to make nameCharArr of the size of the SCHEMA so 100 * 4 bytes per char, so 100 elements
		const restData = new soproxABI.struct(PROJECT_DATA_SCHEMA, {
			index,
			name: nameCharArr.length < 100 ? nameCharArr.concat(...Array(100 - nameCharArr.length).fill('')) : nameCharArr,
		});
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
		// Object data strings need to be passed as array of chars
		// The first one is my correct utf bytes identifying char
		const messageCharArr = message.split('');
		// Concat N elements to make nameCharArr of the size of the SCHEMA so 140 * 4 bytes per char, so 140 elements
		const restData = new soproxABI.struct(TASK_DATA_SCHEMA, {
			index,
			message:
				messageCharArr.length < 140
					? messageCharArr.concat(...Array(140 - messageCharArr.length).fill(''))
					: messageCharArr,
			completed,
		});
		// Pack passed data toghether
		const data = soproxABI.pack(tagData, restData);

		return new TransactionInstruction({
			keys,
			data,
			programId: APP_PROGRAM_ID,
		});
	}
}
