export type AppInstructionLayoutType =
	| { setUserData: SetUserDataParams }
	| { setProjectData: SetProjectDataParams }
	| { setTaskData: SetTaskDataParams };

export interface SetUserDataParams {
	name: string;
}

export interface SetProjectDataParams {
	index: number;
	name: string;
}

export interface SetTaskDataParams {
	index: number;
	message: string;
	completed: boolean;
}

export type AppInstructionType =
	| { type: 'setUserData'; params: SetUserDataParams }
	| { type: 'setProjectData'; params: SetProjectDataParams }
	| { type: 'setTaskData'; params: SetTaskDataParams };
