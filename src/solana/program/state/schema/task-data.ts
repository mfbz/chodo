import { Layout, bool, u64 } from '@project-serum/borsh';
import { struct, utf8 } from 'buffer-layout';
import BN from 'bn.js';

// NB: Add the index to be unique from parent seed creation
export interface TaskData {
	index: BN;
	message: string;
	completed: boolean;
}

// Size is ???, 1 byte per character FOR MESSAGE (like twitter eheheh)
// 140 message + 1 boolean
export const TASK_DATA_LAYOUT: Layout<TaskData> = struct([u64('index'), utf8(140, 'message'), bool('completed')]);
