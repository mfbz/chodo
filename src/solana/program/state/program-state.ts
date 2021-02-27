import { ProjectData, PROJECT_DATA_SCHEMA } from './schema/project-data';
import { TaskData, TASK_DATA_SCHEMA } from './schema/task-data';
import { UserData, USER_DATA_SCHEMA } from './schema/user-data';
import soproxABI from 'soprox-abi';

export class ProgramState {
	static decodeUserData(data: Buffer): UserData {
		const layout = new soproxABI.struct(USER_DATA_SCHEMA);
		layout.fromBuffer(data);

		return layout.value;
	}

	static decodeProjectData(data: Buffer): ProjectData {
		const layout = new soproxABI.struct(PROJECT_DATA_SCHEMA);
		layout.fromBuffer(data);

		return layout.value;
	}

	static decodeTaskData(data: Buffer): TaskData {
		const layout = new soproxABI.struct(TASK_DATA_SCHEMA);
		layout.fromBuffer(data);

		return layout.value;
	}
}
