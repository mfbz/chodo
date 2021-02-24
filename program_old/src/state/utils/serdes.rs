#![cfg(feature = "program")]

use borsh::{BorshDeserialize, BorshSerialize};
use solana_sdk::program_error::ProgramError;

/// SERialization and DESerialization traits needed to handle messages
pub trait Serdes: Sized + BorshSerialize + BorshDeserialize {
	fn pack(&self, dst: &mut [u8]) {
		let encoded = self.try_to_vec().unwrap();
		dst[..encoded.len()].copy_from_slice(&encoded);
	}
	fn unpack(src: &[u8]) -> Result<Self, ProgramError> {
		Self::try_from_slice(src).map_err(|_| ProgramError::InvalidAccountData)
	}
}
