import { ProjectData, PROJECT_DATA_SCHEMA } from './schema/project-data';
import { TaskData, TASK_DATA_SCHEMA } from './schema/task-data';
import { UserData, USER_DATA_SCHEMA } from './schema/user-data';
import soproxABI from 'soprox-abi';

export class ProgramState {
	static decodeUserData(data: Buffer): UserData {
		const layout = new soproxABI.struct(USER_DATA_SCHEMA);
		layout.fromBuffer(data);

		// NB: Remember that strings are passed as char with a char each 4 where the last 3 could be 0
		// If i don't remove them i could have a string like '' of length 4 because it's identified by 4 zeros
		// So remove them by filtering the ones that have a char code of 0 in their position
		return {
			name: [...layout.value.name].filter((c) => c.charCodeAt(0) !== 0).join(''),
			premium: layout.value.premium,
		};
	}

	static decodeProjectData(data: Buffer): ProjectData {
		const layout = new soproxABI.struct(PROJECT_DATA_SCHEMA);
		layout.fromBuffer(data);

		return {
			index: layout.value.index,
			name: [...layout.value.name].filter((c) => c.charCodeAt(0) !== 0).join(''),
		};
	}

	static decodeTaskData(data: Buffer): TaskData {
		const layout = new soproxABI.struct(TASK_DATA_SCHEMA);
		layout.fromBuffer(data);

		return {
			index: layout.value.index,
			message: [...layout.value.message].filter((c) => c.charCodeAt(0) !== 0).join(''),
			completed: layout.value.completed,
		};
	}
}
