import React, { useCallback, useState } from 'react';
import { useProjects } from './hooks/use-projects';
import { AppMenu } from './components/app-menu';
import { Project } from './interfaces/project';
import { VaporButton } from '../../components/vapor-button';
import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Checkbox, List, Modal, Typography } from 'antd';
import { useUser } from './hooks/use-user';
import { useTasks } from './hooks/use-tasks';

export const App = React.memo(function App() {
	const user = useUser();
	const projects = useProjects(user.id);

	const [selectedProject, setSelectedProject] = useState<Project>(projects?.[0]);
	const tasks = useTasks(selectedProject?.id);

	const [projectModalVisible, setProjectModalVisible] = useState(false);
	const [confirmProjectModalLoading, setConfirmProjectModalLoading] = useState(false);

	const handleProjectModalOk = useCallback(() => {
		setConfirmProjectModalLoading(true);
		console.log('pressed ok');

		// TODO here i need to implement the async call
		setTimeout(() => {
			setProjectModalVisible(false);
			setConfirmProjectModalLoading(false);
		}, 2000);
	}, []);
	const handleProjectModalCancel = useCallback(() => {
		setProjectModalVisible(false);
	}, []);

	const onAddProject = useCallback(() => {
		setProjectModalVisible(true);
	}, []);

	const onSelectProject = useCallback((project: Project) => {
		setSelectedProject(project);
	}, []);

	const onCreateTask = useCallback(() => {
		// TODO
	}, []);

	return (
		<>
			<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
				<AppMenu
					selectedProject={selectedProject}
					projects={projects}
					onAdd={onAddProject}
					onSelect={onSelectProject}
				/>

				<div style={{ flex: 1 }}>
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							paddingLeft: 24,
							paddingRight: 48,
						}}
					>
						<div
							style={{
								height: 80,
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<div style={{ flex: 1 }}>
								<div style={{}}>
									<Typography.Title level={4} style={{ padding: 0, margin: 0 }}>
										{selectedProject?.name || 'No project selected'}
									</Typography.Title>
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<div style={{}}>
									<VaporButton icon={<PlusOutlined />} danger={true} size={'large'} onClick={onCreateTask}>
										Create task
									</VaporButton>
								</div>

								<div style={{ marginLeft: 16 }}>
									<Avatar size="large">{user?.name[0] || '-'}</Avatar>
								</div>
							</div>
						</div>

						<div style={{ flex: 1, marginTop: 24 }}>
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									paddingTop: 12,
									paddingBottom: 8,
									paddingLeft: 16,
									paddingRight: 16,
								}}
							>
								<Typography.Text strong={true}>Tasks</Typography.Text>
							</div>

							<List
								dataSource={tasks}
								renderItem={(item, index) => {
									const isFirst = index === 0;

									return (
										<List.Item style={{ cursor: 'pointer', padding: 0, marginTop: isFirst ? -2 : 0 }}>
											<div
												style={{
													width: '100%',
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center',
													paddingTop: 14,
													paddingBottom: 12,
													paddingLeft: 16,
													paddingRight: 16,
												}}
											>
												<Checkbox checked={item.completed} onChange={(event) => console.log(event.target.checked)} />

												<div style={{ marginLeft: 16 }}>
													<Typography.Text delete={item.completed}>{item.message}</Typography.Text>
												</div>
											</div>
										</List.Item>
									);
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			<Modal
				title={
					<Typography.Title level={5} style={{ padding: 0, margin: 0 }}>
						{'Add project'}
					</Typography.Title>
				}
				okText={'Add'}
				cancelText={'Cancel'}
				centered={true}
				visible={projectModalVisible}
				confirmLoading={confirmProjectModalLoading}
				onOk={handleProjectModalOk}
				onCancel={handleProjectModalCancel}
			>
				<p>{'Project modal'}</p>
			</Modal>
		</>
	);
});
