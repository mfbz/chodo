export type AppInstructionLayoutType = {
	setUserData: SetUserDataParams;
};

export interface SetUserDataParams {
	name: string;
}

export type AppInstructionType = {
	type: 'setUserData';
	params: SetUserDataParams;
};
