import React from 'react';
import { WalletConfig } from '../interfaces/wallet-config';

export const WalletContext = React.createContext<WalletConfig>({
	wallet: undefined,
	connected: false,
	provider: undefined,
	showDrawer: () => { }
});