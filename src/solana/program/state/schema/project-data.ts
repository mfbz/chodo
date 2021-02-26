import { Layout, u32 } from '@project-serum/borsh';
import { struct, utf8 } from 'buffer-layout';

// NB: Add the index to be unique from parent seed creation
export interface ProjectData {
	index: number;
	name: string;
}

// Size is ???, 1 byte per character FOR NAME
export const PROJECT_DATA_LAYOUT: Layout<ProjectData> = struct([u32('index'), utf8(100, 'name')]);
