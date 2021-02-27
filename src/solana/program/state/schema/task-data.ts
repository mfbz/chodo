import { Layout, bool, u32, str, struct } from '@project-serum/borsh';

// NB: Add the index to be unique from parent seed creation
export interface TaskData {
	index: number;
	message: string;
	completed: boolean;
}

// Size is ???, 1 byte per character FOR MESSAGE (like twitter eheheh)
// 32 + 140 message + 1 boolean
export const TASK_DATA_LAYOUT: Layout<TaskData> = struct([u32('index'), str('message'), bool('completed')]);
