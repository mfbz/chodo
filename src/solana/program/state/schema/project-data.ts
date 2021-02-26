import { Layout, u64 } from '@project-serum/borsh';
import { struct, utf8 } from 'buffer-layout';
import BN from 'bn.js';

// NB: Add the index to be unique from parent seed creation
export interface ProjectData {
	index: BN;
	name: string;
}

// Size is ???, 1 byte per character FOR NAME
export const PROJECT_DATA_LAYOUT: Layout<ProjectData> = struct([u64('index'), utf8(100, 'name')]);
