import { WalletAdapter } from "./wallet-adapter";
import { WalletEndpoint } from "./wallet-endpoint";

export interface WalletConfig {
	wallet: WalletAdapter | undefined;
	connected: boolean;
	provider?: WalletEndpoint;
	showDrawer: () => void;
}