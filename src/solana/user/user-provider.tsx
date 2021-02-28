import { Form, Input, Modal, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { VaporMessage } from '../../components/vapor-message';
import { useConnection } from '../connection';
import { APP_PROGRAM_ID } from '../program/instruction';
import { ProgramTransaction } from '../program/transaction';
import { useWallet, WalletAdapter } from '../wallet';
import { UserContext } from './context/user-context';
import { User } from './user';
import { requestAirdrop } from './utils/request-airdrop';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	// The user filled when created or from wallet account and passed to context to be used
	const [user, setUser] = useState<User>();

	// User form
	const [userForm] = Form.useForm();
	// To show that i'm loading the response of the modal
	const [confirmModalLoading, setConfirmModalLoading] = useState(false);

	// To show or not the modal
	const [modalVisible, setModalVisible] = useState(false);
	// Useful methods to handle modal visibility
	const showModal = useCallback(() => setModalVisible(true), []);
	const closeModal = useCallback(() => setModalVisible(false), []);

	// The connection used to do transactions
	const { endpoint, connection } = useConnection();
	// The wallet i need to use for logging the user
	const { wallet, connected: walletConnected } = useWallet();

	// If I detected a wallet and it's connected try to get user data and set user automatically
	useEffect(() => {
		console.log('User initialization');

		const initializeUser = async (wallet: WalletAdapter) => {
			if (wallet.publicKey) {
				// Get automatically the whole user account, if nothing returned it doesn't exists
				const _user = await User.fetch(connection, wallet.publicKey, APP_PROGRAM_ID);
				if (_user) {
					console.log('User found');
					console.log(_user);
					// If exists get data and set user
					setUser(_user);

					// If no data open modal to set it
					console.log('user NAME length:', _user.data.name.length);
					if (_user.data.name.length === 0) {
						showModal();
					}
				} else {
					console.log('User not found, showing create modal');
					// If no, show crate user modal
					showModal();
				}
			}
		};

		if (wallet && walletConnected) {
			console.log('Initialize user from wallet');
			initializeUser(wallet);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet, walletConnected]);

	const handleModalOk = useCallback(() => {
		setConfirmModalLoading(true);

		console.log('Pressed user form create');
		userForm.submit();
	}, [userForm]);
	const onSubmitUserForm = useCallback(
		(values) => {
			console.log('User form submitted values', values);

			const createUser = async (wallet: WalletAdapter) => {
				// Get data from the form to be saved
				// name max length is already determined with a filter on the input
				const data = { name: values.name, premium: true };

				if (wallet.publicKey) {
					// Do an airdrop to wallet account
					await requestAirdrop(endpoint, connection, wallet.publicKey);
					console.log('Airdrop to wallet account completed');

					try {
						if (!user) {
							console.log('Creating empty user account');
							// Create an empty user account through SystemProgram transaction
							await ProgramTransaction.createEmptyUserAccount(connection, wallet, APP_PROGRAM_ID);
							console.log('Created empty user account');
						}

						// Set user data to the account using submitted value
						await ProgramTransaction.setUserAccountData(connection, wallet, APP_PROGRAM_ID, data);
						console.log('The data has been set to user account');
					} catch (error) {
						VaporMessage.error({ content: 'An error occurred creating user account' });
						console.error('An error occurred creating user account', error);
					}

					// Get the user with filled data, set it and close everything
					const _user = await User.fetch(connection, wallet.publicKey, APP_PROGRAM_ID);
					if (_user) {
						console.log('Just created user found, setting it');
						setUser(_user);

						closeModal();
						setConfirmModalLoading(false);
						userForm.resetFields();
					} else {
						VaporMessage.error({ content: 'An error occurred creating user account' });
						console.error('User account was created but not found');
					}
				}
			};

			if (wallet) {
				console.log('Creating user account...');
				createUser(wallet);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[wallet, user, userForm],
	);

	return (
		<UserContext.Provider
			value={{
				user,
			}}
		>
			<>
				{children}

				<Modal
					title={
						<Typography.Title level={5} style={{ padding: 0, margin: 0 }}>
							{'Create account'}
						</Typography.Title>
					}
					okText={'Create'}
					centered={true}
					closable={false}
					visible={modalVisible}
					confirmLoading={confirmModalLoading}
					onOk={handleModalOk}
					cancelButtonProps={{ style: { display: 'none' } }}
				>
					<Form form={userForm} layout="vertical" onFinish={onSubmitUserForm}>
						<Form.Item
							name={'name'}
							label={<Typography.Text strong={true}>Name</Typography.Text>}
							rules={[{ required: true, message: '' }]}
							style={{ marginBottom: 0 }}
						>
							<Input maxLength={55} size={'large'} style={{ borderRadius: 8 }} />
						</Form.Item>
					</Form>
				</Modal>
			</>
		</UserContext.Provider>
	);
};
