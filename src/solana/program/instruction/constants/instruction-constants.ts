import { EnumLayout, rustEnum, bool, u32, str, struct } from '@project-serum/borsh';
import { PublicKey } from '@solana/web3.js';
import { AppInstructionLayoutType } from '../interfaces/instruction-schema';

// TODO GET IT PROGRAMMATICALLY WHEN BUILDING PROGRAM
// App program id
export const APP_PROGRAM_ID = new PublicKey('BJT7bwqcnXRiw9B96RiXWL4bKgHwXr4cPW8T8CTkzyNk');

// Define the structure of each entry in app-instruction file
export const APP_INSTRUCTION_LAYOUT: EnumLayout<AppInstructionLayoutType> = rustEnum([
	struct([str('name')], 'setUserData'),
	struct([u32('index'), str('name')], 'setProjectData'),
	struct([u32('index'), str('message'), bool('completed')], 'setTaskData'),
]);

export const APP_INSTRUCTION_MAX_SPAN = Math.max(...Object.values(APP_INSTRUCTION_LAYOUT.registry).map((r) => r.span));
