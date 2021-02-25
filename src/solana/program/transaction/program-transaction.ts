import { Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import { User, USER_SEED } from '../../user/user';
import { USER_DATA_LAYOUT } from '../state/store/user-data';

// A list of useful static methods that send transaction to solana
// It's here for a pratical purpose: have all the transaction i can do in one place near program-like stuff
export class ProgramTransaction {
	static async createEmptyUserAccount(connection: Connection, walletPk: PublicKey, programId: PublicKey) {
		// Derive the user public key by generating from seed
		const userPk = await User.getPublicKeyFromSeed(walletPk, programId);

		// Calculate minimum balance for rent exemption depending on occupied space by the account
		// This is to avoid that the account is deleted after some epoch
		const rentExemptionLamports = await connection.getMinimumBalanceForRentExemption(USER_DATA_LAYOUT.span);

		// Create a transaction to create the user account in a deterministic way derived from wallet public key
		const tx = SystemProgram.createAccountWithSeed({
			fromPubkey: walletPk,
			lamports: rentExemptionLamports,
			space: USER_DATA_LAYOUT.span,
			basePubkey: walletPk,
			seed: USER_SEED,
			programId,
			newAccountPubkey: userPk,
		});

		// TODOOOOOO USE WALLET??????
		// Execute the transaction
		await sendAndConfirmTransaction(connection, new Transaction().add(tx), [payer]);
	}
}
