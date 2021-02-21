#![cfg(feature = "program")]

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum AppInstruction {
	/// 0. `[is_signer]`
	/// 1. `[writable]` Signer's User Account'
	CreateUser { name: String },
}
