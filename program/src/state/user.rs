#![cfg(feature = "program")]

use crate::utils::serdes::Serdes;
use borsh::{BorshDeserialize, BorshSerialize};

/// Use borsh macro for serialization/deserialization purposes
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug)]
pub struct User {
	pub name: String,
}

impl User {
	// The static seed phrase used to create an account
	pub const SEED: &'static str = "user";
	pub const MIN_SPACE: usize = 228;

	// Create an user account in a deterministic way from account pubkey
	pub fn create_with_seed(account_pk: &Pubkey, program_id: &Pubkey) -> Result<Pubkey, PubkeyError> {
		Pubkey::create_with_seed(&account_pk, User::SEED, &program_id)
	}
}

// Implement SERialization and DESerialization traits
impl Serdes for User {}
