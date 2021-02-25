export type AppInstructionLayoutType = {
	createUser: CreateUserParams;
};

export interface CreateUserParams {
	name: string;
}

export type AppInstructionType = {
	type: 'createUser';
	params: CreateUserParams
};