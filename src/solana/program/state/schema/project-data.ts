// NB: Add the index to be unique from parent seed creation
// 32 index u32 + 100 char array
export interface ProjectData {
	index: number;
	name: string;
}

// Soprox data schema for encoding and decoding
// https://soprox.descartes.network/development/soproxabi
export const PROJECT_DATA_SCHEMA = [
	{ key: 'index', type: 'u32' },
	{ key: 'name', type: '[char;100]' },
];

export const PROJECT_DATA_SPAN = 4 + 100 * 4;
