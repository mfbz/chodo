import { TransactionInstruction } from '@solana/web3.js';
import { APP_INSTRUCTION_MAX_SPAN, APP_INSTRUCTION_LAYOUT } from '../constants/instruction-constants';
import { AppInstructionLayoutType, AppInstructionType, SetUserDataParams } from '../interfaces/instruction-schema';

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
	} else {
		throw new Error('Unsupported App instruction type');
	}
}