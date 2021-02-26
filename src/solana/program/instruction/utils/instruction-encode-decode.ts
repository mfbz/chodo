import { TransactionInstruction } from '@solana/web3.js';
import { APP_INSTRUCTION_MAX_SPAN, APP_INSTRUCTION_LAYOUT } from '../constants/instruction-constants';
import { AppInstructionLayoutType, AppInstructionType, SetProjectDataParams, SetTaskDataParams, SetUserDataParams } from '../interfaces/instruction-schema';

export function encodeAppInstructionData(instruction: AppInstructionLayoutType) {
	const b = Buffer.alloc(APP_INSTRUCTION_MAX_SPAN);
	const span = APP_INSTRUCTION_LAYOUT.encode(instruction, b);
	return b.slice(0, span);
}

export function decodeAppInstructionData(data: Buffer) {
	return APP_INSTRUCTION_LAYOUT.decode(data);
}

export function decodeAppInstruction(instruction: TransactionInstruction): AppInstructionType {
	const data = decodeAppInstructionData(instruction.data);

	if ('setUserData' in data) {
		const type = 'setUserData';
		const params: SetUserDataParams = {
			name: data.setUserData.name,
		};
		return { type, params };
	} else if ('setProjectData' in data) {
		const type = 'setProjectData';
		const params: SetProjectDataParams = {
			index: data.setProjectData.index,
			name: data.setProjectData.name,
		};
		return { type, params };
	} else if ('setTaskData' in data) {
		const type = 'setTaskData';
		const params: SetTaskDataParams = {
			index: data.setTaskData.index,
			message: data.setTaskData.message,
			completed: data.setTaskData.completed,
		};
		return { type, params };
	} else {
		throw new Error('Unsupported App instruction type');
	}
}
