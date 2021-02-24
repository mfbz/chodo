#![cfg(feature = "program")]

use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};
use solana_program::{
	program_error::ProgramError,
	program_option::COption,
	program_pack::{Pack, Sealed},
	pubkey::Pubkey,
};
use std::str;

/// User data
#[derive(Clone, Copy, Debug, Default, PartialEq)]
pub struct User {
	/// The name of the user
	pub name: String,
}

impl Pack for User {
	const LEN: usize = 55;

	// Unpack a user object from passed byte array returning a new instance of User struct
	fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
		// generate an array reference to a subset of a sliceable bit of data (which could be an array, or a slice, or a Vec)
		// Read all the data until the LENgth of the user data
		let src = array_ref![src, 0, User::LEN];

		// break an array into a series of contiguous and non-overlapping arrays, generating sub arrays of bytes
		// each value destructured on the left is an array of bytes
		// Put each slice of data accordingly with its bytes
		let (nameByteArr) = array_refs![src, 55];

		// Extract name string from utf8 byte array by unwrapping and sending the error above if invalid data
		let name = str::from_utf8(&nameByteArr).unwrap()?;

		// I unpacked correctly, return unpacked struct instance
		Ok(User { name });
	}

	// All applied on dst mutable byte array reference passed and return nothing because it modified dst input
	fn pack_into_slice(&self, dst: &mut [u8]) {
		// generate a mutable array reference to a subset of a sliceable bit of data (which could be an array, or a slice, or a Vec)
		let dst = array_mut_ref![dst, 0, User::LEN];

		// generate a series of mutable array references to an input mutable array reference
		// dst is an array of mutable references that will be filled with byte arrays to be packed
		let (nameByteArr_dst) = mut_array_refs![dst, 55];

		// Create a mutable user object from itself to get its values data
		let &User { name } = self;

		// Convert data to byte array and save into its dst array
		*nameByteArr_dst = name.as_bytes();
	}
}

impl Sealed for User {}

// State pack/unpack helpers
fn pack_coption_key(src: &COption<Pubkey>, dst: &mut [u8; 36]) {
	let (tag, body) = mut_array_refs![dst, 4, 32];
	match src {
		COption::Some(key) => {
			*tag = [1, 0, 0, 0];
			body.copy_from_slice(key.as_ref());
		}
		COption::None => {
			*tag = [0; 4];
		}
	}
}
fn unpack_coption_key(src: &[u8; 36]) -> Result<COption<Pubkey>, ProgramError> {
	let (tag, body) = array_refs![src, 4, 32];
	match *tag {
		[0, 0, 0, 0] => Ok(COption::None),
		[1, 0, 0, 0] => Ok(COption::Some(Pubkey::new_from_array(*body))),
		_ => Err(ProgramError::InvalidAccountData),
	}
}
fn pack_coption_u64(src: &COption<u64>, dst: &mut [u8; 12]) {
	let (tag, body) = mut_array_refs![dst, 4, 8];
	match src {
		COption::Some(amount) => {
			*tag = [1, 0, 0, 0];
			*body = amount.to_le_bytes();
		}
		COption::None => {
			*tag = [0; 4];
		}
	}
}
fn unpack_coption_u64(src: &[u8; 12]) -> Result<COption<u64>, ProgramError> {
	let (tag, body) = array_refs![src, 4, 8];
	match *tag {
		[0, 0, 0, 0] => Ok(COption::None),
		[1, 0, 0, 0] => Ok(COption::Some(u64::from_le_bytes(*body))),
		_ => Err(ProgramError::InvalidAccountData),
	}
}
