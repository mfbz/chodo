import {
	PublicKey,
	SYSVAR_RENT_PUBKEY,
	TransactionInstruction,
	AccountMeta,
} from '@solana/web3.js';
import BN from 'bn.js';
import {
	option,
	publicKey,
	rustEnum,
	u64,
	struct,
	u8,
	EnumLayout,
} from '@project-serum/borsh';
import { utf8 } from 'buffer-layout';

export const APP_PROGRAM_ID = new PublicKey(
	'AppkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA_TODOOOOO',
);

export type AppInstructionLayout =
	| {
		createUser: {
			name: string;
		};
	};

export const AppInstructionLayout: EnumLayout<AppInstructionLayout> = rustEnum(
	[
		struct(
			[
				utf8(55, 'name'),
			],
			'createUser',
		),
	],
);

const instructionMaxSpan = Math.max(
	...Object.values(AppInstructionLayout.registry).map(r => r.span),
);

function encodeAppInstructionData(instruction: AppInstructionLayout) {
	const b = Buffer.alloc(instructionMaxSpan);
	const span = AppInstructionLayout.encode(instruction, b);
	return b.slice(0, span);
}

function decodeAppInstructionData(data: Buffer) {
	return AppInstructionLayout.decode(data);
}

export interface CreateUserParams {
	name: string;
}

// Todo this return a transaction to be used!!!!! in which i can set my needed kkeys that are the needed accounts
export class AppInstructions {
	static createUser(keys: AccountMeta[], {
		name,
	}: CreateUserParams): TransactionInstruction {
		return new TransactionInstruction({
			keys,
			data: encodeAppInstructionData({
				createUser: {
					name
				},
			}),
			programId: APP_PROGRAM_ID,
		});
	}
}

export type AppInstruction = { type: 'createUser'; params: CreateUserParams };

export function decodeAppInstruction(
	instruction: TransactionInstruction,
): AppInstruction {
	const data = decodeAppInstructionData(instruction.data);

	if ('createUser' in data) {
		const type = 'createUser';
		const params: CreateUserParams = {
			name: data.createUser.name,
		};
		return { type, params };
	} else {
		throw new Error('Unsupported App instruction type');
	}
}