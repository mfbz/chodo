import { useCallback, useEffect, useState } from 'react';
import { useConnection } from '../../connection';
import { APP_PROGRAM_ID } from '../../program/instruction';
import { ProgramTransaction } from '../../program/transaction';
import { Project } from '../../project';
import { useUser } from '../../user';
import { useWallet } from '../../wallet';
import { Task } from '../task';

// Load all the tasks of the user in the context
export function useTasks(project?: Project) {
	const { connection } = useConnection();
	const { wallet } = useWallet();
	const { user } = useUser();

	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const fetchTasks = async (project: Project) => {
			const _tasks = await Task.fetchAll(connection, project.publicKey, APP_PROGRAM_ID);
			setTasks(_tasks);
		};

		// When the wallet and the user are available fetch and set tasks
		if (project) {
			fetchTasks(project);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [project]);

	// Due to the fact that the initialization operation is expensive i provide useful methods to updated tasks array
	// Without the need to reload it everytime
	// It's async so that i can wait for in where i use it and throw if problems so i handle them in UI
	const createTask = useCallback(
		async ({ message, completed }: { message: string; completed: boolean }) => {
			if (!wallet || !wallet.publicKey) {
				throw new Error('Wallet not found or wallet public key not valid');
			}
			if (!user) {
				throw new Error('User not found');
			}
			if (!project) {
				throw new Error('Project not found');
			}

			// The data to be inserted for creating the task
			// The index of the new task is the last task index + 1, considering that i start from 0 so it's the length
			const data = {
				index: tasks.length,
				message,
				completed,
			};

			// Create an empty task account through SystemProgram transaction
			await ProgramTransaction.createEmptyTaskAccount(
				connection,
				wallet,
				APP_PROGRAM_ID,
				project.publicKey,
				data.index,
			);
			// Set task data to the account using submitted value
			await ProgramTransaction.setTaskAccountData(
				connection,
				wallet,
				APP_PROGRAM_ID,
				data,
				user.publicKey,
				project.publicKey,
				data.index,
			);

			// Get the task with filled data
			const task = await Task.fetch(connection, project.publicKey, APP_PROGRAM_ID, data.index);
			if (task) {
				setTasks((_tasks) => [..._tasks, task]);
			} else {
				throw new Error('An error occurred creating task account');
			}
		},
		[connection, wallet, user, project, tasks],
	);

	return {
		tasks,
		createTask,
	};
}
