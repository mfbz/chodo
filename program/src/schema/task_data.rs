#![cfg(feature = "program")]

use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};
use solana_sdk::{
	program_error::ProgramError,
	program_pack::{IsInitialized, Pack, Sealed},
};
use std::convert::TryInto;

// DOCS: Reac this for string encoding utf8
// https://doc.rust-lang.org/book/ch08-02-strings.html
#[derive(Clone, Debug, Default, PartialEq)]
pub struct TaskData {
	pub index: u32,
	pub message: String,
	pub completed: bool
}

impl Sealed for TaskData {}

impl IsInitialized for TaskData {
	fn is_initialized(&self) -> bool {
		true
	}
}

impl Pack for TaskData {
	// Fixed length
	const LEN: usize = 4 + 140 * 4 + 1;
	// Unpack data from [u8] to the data struct
	fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
		let src = array_ref![src, 0, 4 + 140 * 4 + 1];
		let (index, message, completed) = array_refs![src, 4, 140 * 4, 1];

		// Get index from bytes
		let index_u = u32::from_le_bytes(*index);
		// From utf8 string that is with a max of 4 bytes but only need first one because it takes 1
		let message_s: String = message
			.chunks(4)
			.map(|slice| String::from_utf8([slice[0]].to_vec()).unwrap())
			.collect();
		// Get completed bool
		let completed_b = match completed {
      [0] => false,
      [1] => true,
      _ => return Err(ProgramError::InvalidAccountData),
    };

		Ok(TaskData {
			index: index_u,
			message: message_s,
			completed: completed_b
		})
	}
	// Pack data from the data struct to [u8]
	fn pack_into_slice(&self, dst: &mut [u8]) {
		let dst = array_mut_ref![dst, 0, 4 + 140 * 4 + 1];
		let (dst_index, dst_message, dst_completed) = mut_array_refs![dst, 4, 140 * 4, 1];

		// Destructure a reference of self to get data to be packed
		let TaskData { index, message, completed } = self;

		// Pack index to dst bytes
		*dst_index = index.to_le_bytes();
		// Counter to set the correct bytes inside dst_message
		pack_string_560(&message, dst_message);
		// Set completed value
		*dst_completed = match completed {
      true => [1],
      _ => [0],
    };
	}
}

// 560 is 140 * 4
fn pack_string_560(src: &String, dst: &mut [u8; 560]) {
    // utf8 strings no unicode no special things, only this
    let mut index = 0;
    for c in src.chars() {
        dst[index] = c.to_string().as_bytes()[0];
        // 4 in 4 because utf8 normal character takes only 1 byte
        index += 4;
    }
}
