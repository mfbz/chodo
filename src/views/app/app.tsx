import React, { useCallback, useMemo, useState } from 'react';
import { useProjects } from './hooks/use-projects';
import { AppMenu } from './components/app-menu';
import { Project } from './interfaces/project';
import { VaporButton } from '../../components/vapor-button';
import { PlusOutlined, WalletOutlined } from '@ant-design/icons';
import { Avatar, Checkbox, Drawer, Form, Input, List, Modal, Typography } from 'antd';
import { useUser } from './hooks/use-user';
import { useTasks } from './hooks/use-tasks';
import WalletAdapter from '@project-serum/sol-wallet-adapter';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { useEffect } from 'react';

export const App = React.memo(function App() {
	// Data
	const user = useUser();
	const projects = useProjects(user.id);

	const [selectedProject, setSelectedProject] = useState<Project>(projects?.[0]);
	const tasks = useTasks(selectedProject?.id);

	// Wallet
	const [walletDrawerVisible, setWalletDrawerVisible] = useState(true);

	// From sol wallet adapter
	const network = clusterApiUrl('devnet');
	const [providerUrl, setProviderUrl] = useState('https://www.sollet.io');
	//const connection = useMemo(() => new Connection(network), [network]);
	const urlWallet = useMemo(() => new WalletAdapter(providerUrl, network), [providerUrl, network]);

	const [selectedWallet, setSelectedWallet] = useState<any>(undefined);
	const [, setConnected] = useState(false);

	useEffect(() => {
		if (selectedWallet) {
			selectedWallet.on('connect', () => {
				setConnected(true);
				setWalletDrawerVisible(false);
				console.log('Connected to wallet ' + selectedWallet.publicKey.toBase58());
			});
			selectedWallet.on('disconnect', () => {
				setConnected(false);
				console.log('Disconnected from wallet');
			});
			selectedWallet.connect();
			setWalletDrawerVisible(true);

			return () => {
				selectedWallet.disconnect();
			};
		}
	}, [selectedWallet]);

	// TODO: Add effect to close drawer if wallet already connected

	// TODO
	const onClickConnectWallet = useCallback(() => {
		// TODO
		setSelectedWallet(urlWallet);
	}, [urlWallet]);

	// Project
	const [projectForm] = Form.useForm();
	const [projectModalVisible, setProjectModalVisible] = useState(false);
	const [confirmProjectModalLoading, setConfirmProjectModalLoading] = useState(false);

	const onAddProject = useCallback(() => {
		setProjectModalVisible(true);
	}, []);
	const onSelectProject = useCallback((project: Project) => {
		setSelectedProject(project);
	}, []);

	const handleProjectModalOk = useCallback(() => {
		setConfirmProjectModalLoading(true);

		console.log('Pressed project form add');
		projectForm.submit();
	}, [projectForm]);
	const handleProjectModalCancel = useCallback(() => {
		setProjectModalVisible(false);
	}, []);

	const onSubmitProjectForm = useCallback(
		(values) => {
			console.log('Project form submitted values', values);

			// TODO here i need to implement the async call
			setTimeout(() => {
				setProjectModalVisible(false);
				setConfirmProjectModalLoading(false);

				projectForm.resetFields();
			}, 2000);
		},
		[projectForm],
	);

	// Task
	const [taskForm] = Form.useForm();
	const [taskModalVisible, setTaskModalVisible] = useState(false);
	const [confirmTaskModalLoading, setConfirmTaskModalLoading] = useState(false);

	const onCreateTask = useCallback(() => {
		setTaskModalVisible(true);
	}, []);

	const handleTaskModalOk = useCallback(() => {
		setConfirmTaskModalLoading(true);

		console.log('Pressed task form create');
		taskForm.submit();
	}, [taskForm]);
	const handleTaskModalCancel = useCallback(() => {
		setTaskModalVisible(false);
	}, []);

	const onSubmitTaskForm = useCallback(
		(values) => {
			console.log('Task form submitted values', values);

			// TODO here i need to implement the async call
			setTimeout(() => {
				setTaskModalVisible(false);
				setConfirmTaskModalLoading(false);

				taskForm.resetFields();
			}, 2000);
		},
		[taskForm],
	);

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

			<Drawer placement={'top'} closable={false} maskClosable={false} visible={walletDrawerVisible} height={200}>
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						padding: 24,
					}}
				>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<Typography.Title level={4} style={{ padding: 0, margin: 0 }}>
							{'Connect a wallet to handle your projects on chodo'}
						</Typography.Title>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 24,
						}}
					>
						<VaporButton icon={<WalletOutlined />} size={'large'} enlarge={true} onClick={onClickConnectWallet}>
							Connect wallet
						</VaporButton>
					</div>
				</div>
			</Drawer>

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
				<Form form={projectForm} layout="vertical" onFinish={onSubmitProjectForm}>
					<Form.Item
						name={'name'}
						label={<Typography.Text strong={true}>Name</Typography.Text>}
						rules={[{ required: true, message: '' }]}
						style={{ marginBottom: 0 }}
					>
						<Input size={'large'} style={{ borderRadius: 8 }} />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title={
					<Typography.Title level={5} style={{ padding: 0, margin: 0 }}>
						{'Create task'}
					</Typography.Title>
				}
				okText={'Create'}
				cancelText={'Cancel'}
				centered={true}
				visible={taskModalVisible}
				confirmLoading={confirmTaskModalLoading}
				onOk={handleTaskModalOk}
				onCancel={handleTaskModalCancel}
			>
				<Form form={taskForm} layout="vertical" onFinish={onSubmitTaskForm}>
					<Form.Item
						name={'message'}
						label={<Typography.Text strong={true}>Message</Typography.Text>}
						rules={[{ required: true, message: '' }]}
						style={{ marginBottom: 0 }}
					>
						<Input size={'large'} style={{ borderRadius: 8 }} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
});
