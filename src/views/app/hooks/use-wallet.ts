import { clusterApiUrl } from '@solana/web3.js';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { solanaConfig } from '../../../utils/solana-config';
import WalletAdapter from '@project-serum/sol-wallet-adapter';

export function useWallet() {
	const network = clusterApiUrl(solanaConfig().network);
	const [providerUrl, setProviderUrl] = useState(solanaConfig().walletProviders[0].url);
	const urlWallet = useMemo(() => new WalletAdapter(providerUrl, network), [providerUrl, network]);

	const [wallet, setWallet] = useState<any>();
	const [walletConnected, setWalletConnected] = useState(false);

	useEffect(() => {
		if (wallet) {
			wallet.on('connect', () => {
				setWalletConnected(true);
				console.log('Connected to wallet ' + wallet.publicKey.toBase58());
			});
			wallet.on('disconnect', () => {
				setWalletConnected(false);
				console.log('Disconnected from wallet');
			});

			// If selected a wallet, start connection
			wallet.connect();

			return () => {
				// Disconnect to cleanup
				wallet.disconnect();
			};
		}
	}, [wallet]);

	const onConnectWallet = useCallback(() => {
		setWallet(urlWallet);
	}, [urlWallet]);

	return { wallet, walletConnected, onConnectWallet };
}
