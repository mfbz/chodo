import { EnumLayout, rustEnum, bool, u32 } from '@project-serum/borsh';
import { PublicKey } from '@solana/web3.js';
import { struct, utf8 } from 'buffer-layout';
import { AppInstructionLayoutType } from '../interfaces/instruction-schema';

// TODOOOOOOOOOO: replace with the correct program id passed as input
// I have to set a real IDDDDDDDD SO BUILD THE PROGRAM AND PASS IT
export const APP_PROGRAM_ID = new PublicKey('AppkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

// Define the structure of each entry in app-instruction file
export const APP_INSTRUCTION_LAYOUT: EnumLayout<AppInstructionLayoutType> = rustEnum([
	struct([utf8(55, 'name')], 'setUserData'),
	struct([u32('index'), utf8(100, 'name')], 'setProjectData'),
	struct([u32('index'), utf8(140, 'message'), bool('completed')], 'setTaskData'),
]);

export const APP_INSTRUCTION_MAX_SPAN = Math.max(...Object.values(APP_INSTRUCTION_LAYOUT.registry).map((r) => r.span));
