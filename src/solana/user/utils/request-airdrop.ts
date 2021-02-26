import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { ConnectionEndpoint } from '../../connection';

const AIRDROP_REQUIRED_LAMPORTS = 1000000000;
const AIRDROP_MAX_RETRIES = 10;
const AIRDROP_RETRY_DELAY_MS = 500;

export async function requestAirdrop(endpoint: ConnectionEndpoint, connection: Connection, walletPk: PublicKey) {
	// Do it only if test networks otherwise i could create infinite money :D:D:D:D:D:D:D
	if (endpoint.name === 'localnet' || endpoint.name === 'devnet') {
		const walletInfo = await connection.getAccountInfo(walletPk);

		// Do it only if less lamport than airdrop otherwise i already did it
		if (!walletInfo || (walletInfo && walletInfo.lamports < AIRDROP_REQUIRED_LAMPORTS)) {
			// Request the airdrop to the wallet account
			await connection.requestAirdrop(walletPk, AIRDROP_REQUIRED_LAMPORTS);

			// Now i have to wait a little time while retrying for the airdrop to happen
			let retries = AIRDROP_MAX_RETRIES;
			while (retries > 0) {
				// Little delay before checking for balance
				await new Promise((resolve) => setTimeout(resolve, AIRDROP_RETRY_DELAY_MS));

				const balance = await connection.getBalance(walletPk);
				if (AIRDROP_REQUIRED_LAMPORTS <= balance) {
					console.log(`Current balance is ${balance / LAMPORTS_PER_SOL} SOL`);
					return;
				}
				console.warn('Airdrop retry ' + retries);
				retries -= 1;
			}
			console.error(`Airdrop of ${AIRDROP_REQUIRED_LAMPORTS / LAMPORTS_PER_SOL} SOL failed`);
		}
	} else {
		console.warn('Cannot request an airdrop', "You can't print SOL my dear :D");
	}
}
