import { EnumLayout, rustEnum } from '@project-serum/borsh';
import { PublicKey } from '@solana/web3.js';
import { struct, utf8 } from 'buffer-layout';
import { AppInstructionLayoutType } from '../interfaces/instruction-schema';

// TODO: replace with the correct program id passed as input
export const APP_PROGRAM_ID = new PublicKey('AppkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA_TODOOOOO');

// Define the structure of each entry in app-instruction file
export const APP_INSTRUCTION_LAYOUT: EnumLayout<AppInstructionLayoutType> = rustEnum([
	struct([utf8(55, 'name')], 'setUserData'),
]);

export const APP_INSTRUCTION_MAX_SPAN = Math.max(...Object.values(APP_INSTRUCTION_LAYOUT.registry).map((r) => r.span));
