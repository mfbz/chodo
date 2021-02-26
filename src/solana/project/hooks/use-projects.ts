import { useCallback, useEffect, useState } from 'react';
import { useConnection } from '../../connection';
import { APP_PROGRAM_ID } from '../../program/instruction/constants/instruction-constants';
import { ProgramTransaction } from '../../program/transaction';
import { User, useUser } from '../../user';
import { useWallet } from '../../wallet';
import { Project } from '../project';

// Load all the projects of the user in the context
export function useProjects() {
	const { connection } = useConnection();
	const { wallet } = useWallet();
	const { user } = useUser();

	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		const fetchProjects = async (user: User) => {
			const _projects = await Project.fetchAll(connection, user.publicKey, APP_PROGRAM_ID);
			setProjects(_projects);
		};

		// When the wallet and the user are available fetch and set projects
		if (user) {
			fetchProjects(user);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	// Due to the fact that the initialization operation is expensive i provide useful methods to updated projects array
	// Without the need to reload it everytime
	// It's async so that i can wait for in where i use it and throw if problems so i handle them in UI
	const createProject = useCallback(
		async ({ name }: { name: string }) => {
			if (!wallet || !wallet.publicKey) {
				throw new Error('Wallet not found or wallet public key not valid');
			}
			if (!user) {
				throw new Error('User not found');
			}

			// The data to be inserted for creating the project
			// The index of the new project is the last project index + 1, considering that i start from 0 so it's the length
			const data = {
				index: projects.length,
				name,
			};

			// Create an empty project account through SystemProgram transaction
			await ProgramTransaction.createEmptyProjectAccount(
				connection,
				wallet,
				APP_PROGRAM_ID,
				user.publicKey,
				data.index,
			);
			// Set project data to the account using submitted value
			await ProgramTransaction.setProjectAccountData(
				connection,
				wallet,
				APP_PROGRAM_ID,
				data,
				user.publicKey,
				data.index,
			);

			// Get the project with filled data
			const project = await Project.fetch(connection, user.publicKey, APP_PROGRAM_ID, data.index);
			if (project) {
				setProjects((_projects) => [..._projects, project]);
			} else {
				throw new Error('An error occurred creating project account');
			}
		},
		[connection, wallet, user, projects],
	);

	return {
		projects,
		createProject,
	};
}
