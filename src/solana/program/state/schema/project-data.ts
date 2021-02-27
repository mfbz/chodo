import { Layout, u32, str, struct } from '@project-serum/borsh';

// NB: Add the index to be unique from parent seed creation
export interface ProjectData {
	index: number;
	name: string;
}

// Size is ???, 1 byte per character FOR NAME
// 32 + 100
export const PROJECT_DATA_LAYOUT: Layout<ProjectData> = struct([u32('index'), str('name')]);
