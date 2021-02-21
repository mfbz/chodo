import WalletAdapter from '@project-serum/sol-wallet-adapter';
import { useMemo } from 'react';

// TODO
export function useUser(wallet: WalletAdapter) {

	
	return useMemo(() => {
		return { id: '1', name: 'mfbz' };
	}, []);
}
