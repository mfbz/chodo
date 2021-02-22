#![cfg(feature = "program")]

use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug)]
pub enum AppInstruction {
	/// 0. `[is_signer]`
	/// 1. `[writable]` Signer's User Account'
	CreateUser { name: String },
}
