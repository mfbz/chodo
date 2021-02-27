#![cfg(feature = "program")]

use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};
use solana_sdk::{
	program_error::ProgramError,
	program_pack::{IsInitialized, Pack, Sealed},
};
use std::convert::TryInto;

// Remember that every utf8 char takes 4 bytes
#[derive(Clone, Copy, Debug, Default, PartialEq)]
pub struct UserData {
	pub name: [char; 55],
}

impl Sealed for UserData {}

impl IsInitialized for UserData {
	fn is_initialized(&self) -> bool {
		true
	}
}

impl Pack for UserData {
	// Fixed length + 1 just in case :)
	const LEN: usize = 55 * 4 + 1;
	// Unpack data from [u8] to the data struct
	fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
		let src = array_ref![src, 0, 55 * 4 + 1];
		let (name, _) = array_refs![src, 55 * 4, 1];

		// Convert from bytes chunk to char, 4 by 4 because 1 char = 4 bytes
		// here it's like 'mfbz' -> ['m', 'f', 'b', 'z']
		let vec_name: Vec<_> = name
			.chunks(4)
			.map(|slice| slice.try_into().unwrap())
			.map(|slice| u32::from_le_bytes(slice))
			.map(|slice| char::from_u32(slice).unwrap())
			.collect();

		// Convert from vector to char array like name type
		Ok(UserData {
			name: vec_to_array_55(vec_name),
		})
	}
	// Pack data from the data struct to [u8]
	fn pack_into_slice(&self, dst: &mut [u8]) {
		let dst = array_mut_ref![dst, 0, 55 * 4 + 1];
		// dst_name is mutable array
		// dst_name is really just [$$$$$$$$$...$$$$] so $ repeated 55 * 4 times
		let (dst_name, _) = mut_array_refs![dst, 55 * 4, 1];

		// Destructure a reference of self to get data to be packed
		// name is like ['m', 'f', 'b', 'z'] so 1 char 55 times
		let &UserData { name } = self;

		// Counter to get the correct char in name
		let mut index = 0;
		// dst_name_iter is like [$$$$, $$$$, $$$$,$$$$, ...$$$$] so $$$$ repeated 55 times
		for dst_name_chunk in dst_name.chunks(4) {
			// Replace the data in the chunk with name values
			name[index].encode_utf8(&mut *dst_name_chunk);
			// Increment counter for next iteration
			index += 1;
		}
	}
}

// Convert a vector to an array of fixed length of 55 (to be used to decode name property)
pub fn vec_to_array_55<T>(v: Vec<T>) -> [T; 55] {
	v.try_into()
		.unwrap_or_else(|v: Vec<T>| panic!("Expected a Vec of length {} but it was {}", 55, v.len()))
}
