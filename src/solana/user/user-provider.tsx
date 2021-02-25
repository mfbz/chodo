import { Form, Input, Modal, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useConnection } from '../connection';
import { APP_PROGRAM_ID } from '../program/instruction/constants/instruction-constants';
import { useWallet, WalletAdapter } from '../wallet';
import { UserContext } from './context/user-context';
import { User } from './user';
import { requestAirdrop } from './utils/request-airdrop';

// must handle:
// - create user account modal
// - create user account through transaction in the modal
// - before creating an account if devnet or testnet (before transaction) do an airdrop
// - save user account data for the newly created account

// - handle transactions that can be done by the user inside user utils
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
	const { wallet } = useWallet();

	// If I detected a wallet and it's connected try to get user data and set user automatically
	useEffect(() => {
		const initializeUser = async (wallet: WalletAdapter) => {
			if (wallet.publicKey) {
				// Get automatically the whole user account, if nothing returned it doesn't exists
				const user = await User.fetch(connection, wallet.publicKey, APP_PROGRAM_ID);
				if (user) {
					// If exists get data and set user
					setUser(user);
				} else {
					// If no, show crate user modal
					showModal();
				}
			}
		};

		if (wallet) {
			initializeUser(wallet);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet]);

	const handleModalOk = useCallback(() => {
		setConfirmModalLoading(true);

		console.log('Pressed user form create');
		userForm.submit();
	}, [userForm]);
	const onSubmitUserForm = useCallback(
		(values) => {
			console.log('User form submitted values', values);

			const createUser = async (wallet: WalletAdapter) => {
				if (wallet.publicKey) {
					// Do an airdrop to wallet account
					await requestAirdrop(endpoint, connection, wallet.publicKey);

					// TODO CREATE USER <--- I'M here!
					// 2 - Create a user account through SystemProgram transaction
					// 3 - Set user data to the account using submitted value
					// 4 - Set user and close everything

					setModalVisible(false);
					setConfirmModalLoading(false);

					userForm.resetFields();
				}
			};

			if (wallet) {
				createUser(wallet);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[wallet, userForm],
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
				>
					<Form form={userForm} layout="vertical" onFinish={onSubmitUserForm}>
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
			</>
		</UserContext.Provider>
	);
};
