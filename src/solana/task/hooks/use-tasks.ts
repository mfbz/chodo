import { useCallback, useEffect, useState } from 'react';
import { useConnection } from '../../connection';
import { APP_PROGRAM_ID } from '../../program/instruction/constants/instruction-constants';
import { TaskData } from '../../program/state/schema/task-data';
import { ProgramTransaction } from '../../program/transaction';
import { User, useUser } from '../../user';
import { useWallet } from '../../wallet';
import { Task } from '../task';

// TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
// Load all the tasks of the user in the context
export function useTasks() {
	const { connection } = useConnection();
	const { wallet } = useWallet();
	const { user } = useUser();

	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const fetchTasks = async (user: User) => {
			const _tasks = await Task.fetchAll(connection, user.publicKey, APP_PROGRAM_ID);
			setTasks(_tasks);
		};

		// When the wallet and the user are available fetch and set tasks
		if (user) {
			fetchTasks(user);
		}
	}, [user]);

	// Due to the fact that the initialization operation is expensive i provide useful methods to updated tasks array
	// Without the need to reload it everytime
	// It's async so that i can wait for in where i use it and throw if problems so i handle them in UI
	const createTask = useCallback(
		async (data: TaskData) => {
			if (!wallet || !wallet.publicKey) {
				throw new Error('Wallet not found or wallet public key not valid');
			}
			if (!user) {
				throw new Error('User not found');
			}

			// The index of the new task is the last task index + 1, considering that i start from 0 so it's the length
			const taskIndex = tasks.length;

			// Create an empty task account through SystemProgram transaction
			await ProgramTransaction.createEmptyTaskAccount(connection, wallet, APP_PROGRAM_ID, user.publicKey, taskIndex);
			// Set task data to the account using submitted value
			await ProgramTransaction.setTaskAccountData(connection, wallet, APP_PROGRAM_ID, data, user.publicKey, taskIndex);

			// Get the task with filled data
			const task = await Task.fetch(connection, user.publicKey, APP_PROGRAM_ID, taskIndex);
			if (task) {
				setTasks((_tasks) => [..._tasks, task]);
			} else {
				throw new Error('An error occurred creating task account');
			}
		},
		[connection, wallet, user, tasks],
	);

	return {
		tasks,
		createTask,
	};
}
