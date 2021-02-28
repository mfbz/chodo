import { useCallback, useEffect, useState } from 'react';
import { useConnection } from '../../connection';
import { APP_PROGRAM_ID } from '../../program/instruction';
import { ProgramTransaction } from '../../program/transaction';
import { Project } from '../../project';
import { useUser } from '../../user';
import { useWallet, WalletAdapter } from '../../wallet';
import { Task } from '../task';

// Load all the tasks of the user in the context
export function useTasks(project?: Project) {
	const { connection } = useConnection();
	const { wallet } = useWallet();
	const { user } = useUser();

	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const fetchTasks = async (wallet: WalletAdapter, project: Project) => {
			if (wallet.publicKey) {
				const _tasks = await Task.fetchAll(connection, wallet.publicKey, APP_PROGRAM_ID, project.publicKey);
				setTasks(_tasks);
			}
		};

		// When the wallet and the user are available fetch and set tasks
		if (wallet && project) {
			fetchTasks(wallet, project);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet, project]);

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

			// Set task data to the account using submitted value
			await ProgramTransaction.createTaskAccountWithData(
				connection,
				wallet,
				APP_PROGRAM_ID,
				data,
				user.publicKey,
				project.publicKey,
				data.index,
			);
			console.log('Task account with data created');

			// Get the task with filled data
			const task = await Task.fetch(connection, wallet.publicKey, APP_PROGRAM_ID, project.publicKey, data.index);
			if (task) {
				setTasks((_tasks) => [..._tasks, task]);
			} else {
				throw new Error('An error occurred creating task account');
			}
		},
		[connection, wallet, user, project, tasks],
	);

	// Change the checked state of the task and update tasks array to reflect changing by replacing the element
	// To avoid expensive refetching
	const checkTask = useCallback(
		async ({ task, completed }: { task: Task; completed: boolean }) => {
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
				index: task.data.index,
				message: task.data.message,
				completed,
			};

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
			console.log('Changed task account data');

			// Get the task with filled data
			const _task = await Task.fetch(connection, wallet.publicKey, APP_PROGRAM_ID, project.publicKey, data.index);
			if (_task) {
				// Replace task at its position
				setTasks((_tasks) => {
					const nTasks = [..._tasks];
					const taskIndexInArr = nTasks.findIndex((nTask) => nTask.data.index === task.data.index);
					if (taskIndexInArr >= 0) {
						nTasks.splice(taskIndexInArr, 1, _task);
						return nTasks;
					} else {
						throw new Error('An error occurred checking task data');
					}
				});
			} else {
				throw new Error('An error occurred checking task data');
			}
		},
		[connection, wallet, user, project],
	);

	return {
		tasks,
		createTask,
		checkTask,
	};
}
