import { ProjectData, PROJECT_DATA_LAYOUT } from './schema/project-data';
import { TaskData, TASK_DATA_LAYOUT } from './schema/task-data';
import { UserData, USER_DATA_LAYOUT } from './schema/user-data';

// Here i export the methods i can use to decode data from accountInfo.data taken from on-chain accounts
// Decode data from byte array
export class ProgramState {
	static decodeUserData(data: Buffer): UserData {
		return USER_DATA_LAYOUT.decode(data);
	}

	static decodeProjectData(data: Buffer): ProjectData {
		return PROJECT_DATA_LAYOUT.decode(data);
	}

	static decodeTaskData(data: Buffer): TaskData {
		return TASK_DATA_LAYOUT.decode(data);
	}
}
