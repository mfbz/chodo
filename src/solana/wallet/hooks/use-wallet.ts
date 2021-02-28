import { useContext } from "react";
import { WalletContext } from "../context/wallet-context";

export function useWallet() {
	const { wallet, connected, provider, showDrawer } = useContext(WalletContext);

	return {
		wallet,
		connected,
		provider,
		showDrawer,
		publicKey: wallet?.publicKey,
		connect: () => {
			wallet ? wallet.connect() : showDrawer();
		},
		disconnect: () => {
			wallet?.disconnect();
		},
	};
}
