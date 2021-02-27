// NB: Add the index to be unique from parent seed creation
// 32 u32 + 140 char 140, bool 1
export interface TaskData {
	index: number;
	message: string;
	completed: boolean;
}

// Soprox data schema for encoding and decoding
// https://soprox.descartes.network/development/soproxabi
export const TASK_DATA_SCHEMA = [
	{ key: 'index', type: 'u32' },
	{ key: 'message', type: '[char;140]' },
	{ key: 'completed', type: 'bool' },
];
