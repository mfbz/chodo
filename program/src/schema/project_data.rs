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
pub struct ProjectData {
	pub index: u32,
	pub name: String,
}

impl Sealed for ProjectData {}

impl IsInitialized for ProjectData {
	fn is_initialized(&self) -> bool {
		true
	}
}

impl Pack for ProjectData {
	// Fixed length
	const LEN: usize = 4 + 100 * 4;
	// Unpack data from [u8] to the data struct
	fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
		let src = array_ref![src, 0, 4 + 100 * 4];
		let (index, name) = array_refs![src, 4, 100 * 4];

		// Get index from bytes
		let index_u = u32::from_le_bytes(*index);
		// From utf8 string that is with a max of 4 bytes but only need first one because it takes 1
		let name_s: String = name
			.chunks(4)
			.map(|slice| String::from_utf8([slice[0]].to_vec()).unwrap())
			.collect();

		Ok(ProjectData {
			index: index_u,
			name: name_s,
		})
	}
	// Pack data from the data struct to [u8]
	fn pack_into_slice(&self, dst: &mut [u8]) {
		let dst = array_mut_ref![dst, 0, 4 + 100 * 4];
		let (dst_index, dst_name) = mut_array_refs![dst, 4, 100 * 4];

		// Destructure a reference of self to get data to be packed
		let ProjectData { index, name } = self;

		// Pack index to dst bytes
		*dst_index = index.to_le_bytes();
		// Counter to set the correct bytes inside dst_name
		pack_string_400(&name, dst_name);
	}
}

// 400 is 100 * 4
fn pack_string_400(src: &String, dst: &mut [u8; 400]) {
    // utf8 strings no unicode no special things, only this
    let mut index = 0;
    for c in src.chars() {
        dst[index] = c.to_string().as_bytes()[0];
        // 4 in 4 because utf8 normal character takes only 1 byte
        index += 4;
    }
}
