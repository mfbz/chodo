import { Layout, bool, u32 } from '@project-serum/borsh';
import { struct, utf8 } from 'buffer-layout';

// NB: Add the index to be unique from parent seed creation
export interface TaskData {
	index: number;
	message: string;
	completed: boolean;
}

// Size is ???, 1 byte per character FOR MESSAGE (like twitter eheheh)
// 140 message + 1 boolean
export const TASK_DATA_LAYOUT: Layout<TaskData> = struct([u32('index'), utf8(140, 'message'), bool('completed')]);
