import { Drawer, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { VaporButton } from '../../components/vapor-button';
import { useConnection } from '../connection';
import { WALLET_ENDPOINTS } from './constants/wallet-constants';
import { WalletContext } from './context/wallet-context';
import { WalletAdapter } from './interfaces/wallet-adapter';
import { WalletEndpoint } from './interfaces/wallet-endpoint';
import { useMediaQuery } from 'react-responsive';

// NB It must stay within connection provider because it uses its hooks
export const WalletProvider = ({
	walletProviderUrl = 'https://www.sollet.io',
	children,
}: {
	walletProviderUrl?: string;
	children: React.ReactNode;
}) => {
	const isSmallScreenOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

	// Use connection context to get the endpoint for connection
	const { endpoint } = useConnection();

	// The provider of the wallet to be used
	const [providerUrl, setProviderUrl] = useState(walletProviderUrl);

	// Indicate whether the wallet is connected or not
	const [connected, setConnected] = useState(false);
	// Indicate whether autoconnect is active or not
	const [autoConnect, setAutoConnect] = useState(false);

	// Extract desired provider among the ones available
	const provider = useMemo(() => WALLET_ENDPOINTS.find(({ url }) => url === providerUrl), [providerUrl]);

	// Get the wallet correlated to selected provider
	const wallet = useMemo(() => {
		if (provider) {
			// Use wallet adapter constructor to create a new wallet
			return new provider.adapter(providerUrl, endpoint) as WalletAdapter;
		}
	}, [provider, providerUrl, endpoint]);

	// What to do on wallet connect event
	useEffect(() => {
		if (wallet) {
			wallet.on('connect', () => {
				if (wallet.publicKey) {
					setConnected(true);

					// For logging purpose
					const walletPublicKey = wallet.publicKey.toBase58();
					const keyToDisplay =
						walletPublicKey.length > 20
							? `${walletPublicKey.substring(0, 7)}.....${walletPublicKey.substring(
									walletPublicKey.length - 7,
									walletPublicKey.length,
							  )}`
							: walletPublicKey;
					console.log('Wallet update', 'Connected to wallet ' + keyToDisplay);
				}
			});

			wallet.on('disconnect', () => {
				setConnected(false);
				console.log('Wallet update', 'Disconnected from wallet');
			});
		}

		return () => {
			setConnected(false);
			if (wallet) {
				wallet.disconnect();
			}
		};
	}, [wallet]);

	// Autoconnected if set so
	useEffect(() => {
		if (wallet && autoConnect) {
			wallet.connect();
			setAutoConnect(false);
		}
		return () => {};
	}, [wallet, autoConnect]);

	// To show or not the drawer
	const [drawerVisible, setDrawerVisible] = useState(false);
	// Useful methods to handle drawer visibility
	const showDrawer = useCallback(() => setDrawerVisible(true), []);
	const closeDrawer = useCallback(() => setDrawerVisible(false), []);

	return (
		<WalletContext.Provider
			value={{
				wallet,
				connected,
				showDrawer,
				provider,
			}}
		>
			<>
				{children}

				<Drawer
					placement={'top'}
					closable={false}
					maskClosable={false}
					visible={drawerVisible}
					height={isSmallScreenOrMobile ? '90%' : '40%'}
				>
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							padding: isSmallScreenOrMobile ? 24 : 48,
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography.Title level={4} style={{ padding: 0, margin: 0 }}>
								{'Connect a wallet to manage your projects on chodo'}
							</Typography.Title>
						</div>

						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								flexWrap: 'wrap',
								marginTop: 24,
							}}
						>
							{WALLET_ENDPOINTS.map((walletEndpoint: WalletEndpoint, index: number) => {
								const onClickWalletEndpoint = () => {
									setProviderUrl(walletEndpoint.url);
									setAutoConnect(true);
									closeDrawer();
								};

								return (
									<div
										key={walletEndpoint.url}
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
											padding: isSmallScreenOrMobile ? 8 : 16,
											margin: isSmallScreenOrMobile ? 8 : 16,
											background: '#FFFFFF',
											border: `2px solid ${providerUrl === walletEndpoint.url ? '#00FFB9' : '#EEECFD'}`,
											borderRadius: 16,
											cursor: 'pointer',
										}}
									>
										<div style={{}}>
											<img alt={`${walletEndpoint.name}`} width={40} height={40} src={walletEndpoint.icon} />
										</div>

										<div style={{ marginTop: isSmallScreenOrMobile ? 8 : 16 }}>
											<VaporButton
												type={providerUrl === walletEndpoint.url ? 'primary' : 'ghost'}
												onClick={onClickWalletEndpoint}
											>
												{walletEndpoint.name}
											</VaporButton>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</Drawer>
			</>
		</WalletContext.Provider>
	);
};
