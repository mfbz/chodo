import { Connection, Transaction } from "@solana/web3.js";
import { WalletAdapter } from "../../../wallet";

export async function sendSignedTransaction(connection: Connection, wallet: WalletAdapter, transaction: Transaction) {
	// Get recent blockhash to stay in the epoch
	let { blockhash } = await connection.getRecentBlockhash();
	// Set blockhash to transaction
	transaction.recentBlockhash = blockhash;

	// Make the wallet sign for the transaction to use it for approval
	let signed = await wallet.signTransaction(transaction);
	// Send the transaction with wallet signature
	let transactionId = await connection.sendRawTransaction(signed.serialize());
	// Wait for chain confirmation
	await connection.confirmTransaction(transactionId);
}