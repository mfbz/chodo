import SolletSVG from './../../../assets/wallets/sollet.svg';
import SolongSVG from './../../../assets/wallets/solong.png';
import SolflareSVG from './../../../assets/wallets/solflare.svg';
import MathWalletSVG from './../../../assets/wallets/mathwallet.svg';
import LedgerSVG from './../../../assets/wallets/ledger.svg';
import { WalletEndpoint } from '../interfaces/wallet-endpoint';
import { SolongWalletAdapter } from '../adapters/solong';
import { LedgerWalletAdapter } from '../adapters/ledger';
import SolWalletAdapter from '@project-serum/sol-wallet-adapter';

export const WALLET_ENDPOINTS = [
	{
		name: "Sollet",
		url: "https://www.sollet.io",
		icon: SolletSVG,
		adapter: SolWalletAdapter
	},
	{
		name: "Solong",
		url: "https://solongwallet.com",
		icon: SolongSVG,
		adapter: SolongWalletAdapter,
	},
	{
		name: "Solflare",
		url: "https://solflare.com/access-wallet",
		icon: SolflareSVG,
		adapter: undefined
	},
	{
		name: "MathWallet",
		url: "https://mathwallet.org",
		icon: MathWalletSVG,
		adapter: undefined
	},
	{
		name: "Ledger",
		url: "https://www.ledger.com",
		icon: LedgerSVG,
		adapter: LedgerWalletAdapter,
	},
] as WalletEndpoint[];
